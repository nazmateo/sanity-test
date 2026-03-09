import SanityImage from '@/app/components/SanityImage'
import SectionBody from '@/app/components/sections/SectionBody'
import SectionContainer from '@/app/components/sections/SectionContainer'
import SplitArrowLink from '@/app/components/sections/SplitArrowLink'
import {resolveSurfaceClass} from '@/app/components/sections/theme'
import SectionTitle from '@/app/components/sections/SectionTitle'
import {type AboutPageOriginSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

export default function AboutOriginSection({section}: {section?: AboutPageOriginSection | null}) {
  if (!section) return null

  const imageRef = section.image?.asset?._ref
  const imageAlt = section.image?.alt || section.heading || 'About origin image'
  const ctaHref = resolveContentLinkHref(section.ctaLink || null) || '#'
  const ctaExternal = isExternalContentLink(section.ctaLink || null)
  const surfaceClass = resolveSurfaceClass(section.backgroundColor, 'midnight')

  return (
    <section className={`about-origin-shell px-4 md:px-8 ${surfaceClass}`}>
      <SectionContainer className="about-origin-layout">
        <div className="about-origin-media">
          {imageRef ? (
            <>
              <SanityImage
                id={imageRef}
                alt={imageAlt}
                width={754}
                height={800}
                mode="cover"
                className="about-origin-image"
              />
              <div className="surface-overlay-dark absolute inset-0" />
            </>
          ) : null}

          {section.imageBadgeLabel ? (
            <div className="about-origin-badge">
              <p className="type-overline text-on-dark">{section.imageBadgeLabel}</p>
            </div>
          ) : null}
        </div>

        <div className="about-origin-copy">
          <div className="flex flex-col gap-6 lg:gap-10">
            <SectionTitle className="text-on-dark">{section.heading}</SectionTitle>
            <SectionBody
              text={section.body}
              splitByParagraphs
              className="space-y-5 text-on-dark"
            />
          </div>

          <SplitArrowLink
            href={ctaHref}
            label={section.ctaLabel || ''}
            target={ctaExternal && section.ctaLink?.openInNewTab ? '_blank' : undefined}
            rel={ctaExternal && section.ctaLink?.openInNewTab ? 'noopener noreferrer' : undefined}
            labelClassName="split-arrow-link-label split-arrow-link-label-ghost"
            arrowClassName="split-arrow-link-arrow"
          />
        </div>
      </SectionContainer>
    </section>
  )
}
