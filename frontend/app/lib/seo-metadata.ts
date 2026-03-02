import type {Metadata} from 'next'

import {buildLanguageAlternates} from '@/sanity/lib/i18n'

type SeoFields = {
  canonicalUrl?: string | null
  noIndex?: boolean | null
  ogTitle?: string | null
  ogDescription?: string | null
}

type BuildSeoMetadataInput = {
  title?: string
  description?: string
  seo?: SeoFields | null
  previousImages?: unknown[]
  newImage?: unknown
  metadataBase?: string
  fallbackCanonical?: string
  alternatePath: string
  discoveredLanguages: string[]
  xDefault?: string
  ogType: 'website' | 'article'
}

function toTwitterImages(images: unknown[]): string[] {
  return images
    .map((image) => (typeof image === 'string' ? image : (image as {url?: string})?.url))
    .filter((image): image is string => Boolean(image))
}

export function buildSeoMetadata({
  title,
  description,
  seo,
  previousImages = [],
  newImage,
  metadataBase,
  fallbackCanonical,
  alternatePath,
  discoveredLanguages,
  xDefault,
  ogType,
}: BuildSeoMetadataInput): Metadata {
  const images = newImage ? [newImage, ...previousImages] : previousImages
  const canonicalUrl = seo?.canonicalUrl || fallbackCanonical
  const alternateLanguages =
    metadataBase && discoveredLanguages.length > 0
      ? {
          ...buildLanguageAlternates(metadataBase, alternatePath, discoveredLanguages),
          ...(xDefault ? {'x-default': xDefault} : {}),
        }
      : undefined

  return {
    title,
    description,
    alternates:
      canonicalUrl || alternateLanguages
        ? {
            canonical: canonicalUrl || undefined,
            languages: alternateLanguages,
          }
        : undefined,
    robots: seo?.noIndex ? {index: false, follow: false} : undefined,
    openGraph: {
      title: seo?.ogTitle || title || undefined,
      description: seo?.ogDescription || description || undefined,
      type: ogType,
      url: canonicalUrl || undefined,
      images: images as NonNullable<Metadata['openGraph']>['images'],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.ogTitle || title || undefined,
      description: seo?.ogDescription || description || undefined,
      images: toTwitterImages(images),
    },
  }
}
