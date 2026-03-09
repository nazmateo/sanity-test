import Link from 'next/link'
import {format, parseISO} from 'date-fns'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {resolveSurfaceClass} from '@/app/components/sections/theme'
import {type HomePageNewsSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

function NewsArrow() {
  return (
    <span className="news-arrow">
      {'->'}
    </span>
  )
}

function SecondaryCard({
  publishedAt,
  title,
  linkLabel,
  href,
  external,
  openInNewTab,
}: {
  publishedAt?: string | null
  title?: string | null
  linkLabel?: string | null
  href?: string | null
  external?: boolean
  openInNewTab?: boolean | null
  }) {
  const content = (
    <article className="news-card">
      <p className="type-news-date">
        {formatNewsDate(publishedAt)}
      </p>
      <p className="type-news-title mt-4">
        {title}
      </p>
      <p className="type-news-link mt-6">
        {linkLabel || 'READ MORE'}
      </p>
      <span className="absolute bottom-0 right-0">
        <NewsArrow />
      </span>
    </article>
  )

  if (!href) return content

  return (
    <Link
      href={href}
      target={external && openInNewTab ? '_blank' : undefined}
      rel={external && openInNewTab ? 'noopener noreferrer' : undefined}
      className="block h-full"
    >
      {content}
    </Link>
  )
}

export default function NewsSection({section}: {section?: HomePageNewsSection | null}) {
  if (!section) return null

  const featured = section.featuredPost
  const featuredImageRef = featured?.cardImage?.asset?._ref
  const featuredImageAlt = featured?.cardImage?.alt || featured?.title || 'Featured news'
  const featuredHref = resolveContentLinkHref(featured?.link || null) || '#'
  const featuredExternal = isExternalContentLink(featured?.link || null)
  const cards = (section.cards || []).slice(0, 3)
  const backToTopHref = resolveContentLinkHref(section.backToTopLink || null) || '#top'
  const backToTopExternal = isExternalContentLink(section.backToTopLink || null)
  const surfaceClass = resolveSurfaceClass(section.backgroundColor, 'midnight')

  return (
    <section className={`news-shell ${surfaceClass}`}>
      <SectionContainer className="flex flex-col gap-6">
        <article className="news-feature-card">
          <div className="news-feature-grid">
            <div className="news-feature-media">
              {featuredImageRef ? (
                <SanityImage
                  id={featuredImageRef}
                  alt={featuredImageAlt}
                  width={608}
                  height={533}
                  mode="cover"
                  className="news-feature-image"
                />
              ) : null}
            </div>
            <div className="news-feature-copy">
              <p className="type-news-date">
                {formatNewsDate(featured?.publishedAt)}
              </p>
              <p className="type-news-title">
                {featured?.title}
              </p>
              <p className="type-news-excerpt">
                {featured?.excerpt}
              </p>
              <Link
                href={featuredHref}
                target={featuredExternal && featured?.link?.openInNewTab ? '_blank' : undefined}
                rel={
                  featuredExternal && featured?.link?.openInNewTab ? 'noopener noreferrer' : undefined
                }
                className="type-news-link"
              >
                {section.featuredLinkLabel || 'READ MORE'}
              </Link>
            </div>
          </div>

          <Link
            href={featuredHref}
            aria-label={section.featuredLinkLabel || 'Read more'}
            target={featuredExternal && featured?.link?.openInNewTab ? '_blank' : undefined}
            rel={featuredExternal && featured?.link?.openInNewTab ? 'noopener noreferrer' : undefined}
            className="absolute bottom-0 right-0"
          >
            <NewsArrow />
          </Link>
        </article>

        <div className="news-grid">
          {cards.map((item, index) => {
            const post = item.post
            const href = resolveContentLinkHref(post?.link || null)
            const external = isExternalContentLink(post?.link || null)
            return (
              <SecondaryCard
                key={`${item._key || post?._id || post?.slug?.current || post?.title || 'news'}-${index}`}
                publishedAt={post?.publishedAt}
                title={post?.title}
                linkLabel={item.linkLabel}
                href={href}
                external={external}
                openInNewTab={post?.link?.openInNewTab}
              />
            )
          })}
        </div>
      </SectionContainer>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 px-4 md:px-8">
        <SectionContainer className="flex justify-end">
          <Link
            href={backToTopHref}
            target={backToTopExternal && section.backToTopLink?.openInNewTab ? '_blank' : undefined}
            rel={
              backToTopExternal && section.backToTopLink?.openInNewTab ? 'noopener noreferrer' : undefined
            }
            className="news-backtotop"
          >
            <span>{section.backToTopLabel || 'Back to Top'}</span>
            <span aria-hidden>^^</span>
          </Link>
        </SectionContainer>
      </div>
    </section>
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
