import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {format, parseISO} from 'date-fns'

import PostContent from '@/app/components/post/PostContent'
import PostHero from '@/app/components/post/PostHero'
import {buildSeoMetadata} from '@/app/lib/seo-metadata'
import {DEFAULT_LANGUAGE} from '@/sanity/lib/i18n'
import {sanityFetch} from '@/sanity/lib/live'
import {postBySlugQuery, postSlugsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

type PostPageData = {
  _id?: string
  title?: string | null
  slug?: {current?: string | null} | null
  language?: string | null
  publishedAt?: string | null
  excerpt?: string | null
  cardImage?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
}

export async function generateStaticParams(): Promise<Array<{slug: string}>> {
  const {data} = await sanityFetch({
    query: postSlugsQuery,
    params: {language: DEFAULT_LANGUAGE},
    perspective: 'published',
    stega: false,
  })

  return ((data as Array<{slug?: string}> | null) || [])
    .map((row) => row.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({slug}))
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {slug} = await props.params
  const {data} = await sanityFetch({
    query: postBySlugQuery,
    params: {slug, language: DEFAULT_LANGUAGE},
    stega: false,
  })

  const post = data as PostPageData | null
  if (!post?._id) {
    return {}
  }

  const parentMetadata = await parent
  const metadataBase = parentMetadata.metadataBase?.toString().replace(/\/$/, '')
  const previousImages = parentMetadata.openGraph?.images
  const normalizedPreviousImages = previousImages
    ? Array.isArray(previousImages)
      ? previousImages
      : [previousImages]
    : []

  const title = post.title || 'Post'
  const description = post.excerpt || post.title || 'Post'
  const ogImage = resolveOpenGraphImage((post.cardImage as any) || undefined)
  const canonical = metadataBase ? `${metadataBase}/newsroom/${slug}` : undefined

  return buildSeoMetadata({
    title,
    description,
    previousImages: normalizedPreviousImages,
    newImage: ogImage,
    metadataBase,
    fallbackCanonical: canonical,
    alternatePath: `/newsroom/${slug}`,
    discoveredLanguages: [DEFAULT_LANGUAGE],
    xDefault: canonical,
    ogType: 'article',
  })
}

export default async function PostPage(props: Props) {
  const {slug} = await props.params
  const {data} = await sanityFetch({
    query: postBySlugQuery,
    params: {slug, language: DEFAULT_LANGUAGE},
  })

  const post = data as PostPageData | null
  if (!post?._id) {
    return notFound()
  }

  return (
    <>
      <PostHero
        title={post.title}
        publishedAt={formatNewsDate(post.publishedAt)}
        imageRef={post.cardImage?.asset?._ref}
        imageAlt={post.cardImage?.alt}
      />
      <PostContent excerpt={post.excerpt} />
    </>
  )
}

function formatNewsDate(value?: string | null) {
  if (!value) return ''
  try {
    return format(parseISO(value), 'd MMMM yyyy')
  } catch {
    return value
  }
}
