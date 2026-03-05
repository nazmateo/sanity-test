import Link from 'next/link'
import {format, parseISO} from 'date-fns'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {type HomePageNewsSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

function NewsArrow() {
  return (
    <span className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[var(--color-albatha-orange)] text-[24px] text-white lg:h-[76px] lg:w-[85px] lg:text-[34px]">
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
    <article className="relative h-full rounded-[14px] bg-[var(--color-albatha-white)] p-5 pr-16 lg:h-[311px] lg:rounded-[14px] lg:px-[20px] lg:pb-[20px] lg:pt-[18px]">
      <p className="font-suse text-[20px] leading-[1.3] text-[rgba(21,29,40,0.5)] lg:text-[30px]">
        {formatNewsDate(publishedAt)}
      </p>
      <p className="mt-4 font-suse text-[28px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[42px]">
        {title}
      </p>
      <p className="mt-6 font-suse text-[16px] uppercase text-[var(--color-albatha-blue)] lg:text-[20px]">
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

  return (
    <section
      className="relative bg-[var(--color-albatha-midnight)] px-4 pb-20 pt-10 md:px-8 lg:px-[160px] lg:pb-[120px]"
      style={{backgroundColor: section.backgroundColor || 'var(--color-albatha-midnight)'}}
    >
      <SectionContainer className="flex flex-col gap-6">
        <article className="relative overflow-hidden rounded-[14px] bg-[var(--color-albatha-white)] p-5 lg:h-[570px] lg:px-[20px] lg:py-[18px]">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[608px_1fr] lg:items-center lg:gap-[42px]">
            <div className="overflow-hidden rounded-[20px]">
              {featuredImageRef ? (
                <SanityImage
                  id={featuredImageRef}
                  alt={featuredImageAlt}
                  width={608}
                  height={533}
                  mode="cover"
                  className="h-[280px] w-full object-cover lg:h-[533px]"
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-6 lg:gap-[32px]">
              <p className="font-suse text-[20px] leading-[1.3] text-[rgba(21,29,40,0.5)] lg:text-[26px]">
                {formatNewsDate(featured?.publishedAt)}
              </p>
              <p className="font-suse text-[30px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[49px]">
                {featured?.title}
              </p>
              <p className="font-suse text-[22px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[32px]">
                {featured?.excerpt}
              </p>
              <Link
                href={featuredHref}
                target={featuredExternal && featured?.link?.openInNewTab ? '_blank' : undefined}
                rel={
                  featuredExternal && featured?.link?.openInNewTab ? 'noopener noreferrer' : undefined
                }
                className="font-suse text-[16px] uppercase text-[var(--color-albatha-blue)] lg:text-[20px]"
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-[26px]">
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

      <div className="pointer-events-none absolute inset-x-0 bottom-4 px-4 md:px-8 lg:px-[160px]">
        <SectionContainer className="flex justify-end">
          <Link
            href={backToTopHref}
            target={backToTopExternal && section.backToTopLink?.openInNewTab ? '_blank' : undefined}
            rel={
              backToTopExternal && section.backToTopLink?.openInNewTab ? 'noopener noreferrer' : undefined
            }
            className="pointer-events-auto inline-flex items-center gap-2 rounded-[8px] bg-white/20 px-[10px] py-[10px] font-suse text-[14px] leading-none text-white"
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
