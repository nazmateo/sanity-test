import SanityImage from '@/app/components/SanityImage'
import SectionBody from '@/app/components/sections/SectionBody'
import SectionContainer from '@/app/components/sections/SectionContainer'
import SplitArrowLink from '@/app/components/sections/SplitArrowLink'
import SectionTitle from '@/app/components/sections/SectionTitle'
import {type AboutPageOriginSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

function resolveSectionBackground(value?: string | null) {
  const raw = (value || '').trim()
  if (!raw) return 'var(--color-albatha-midnight)'

  if (/^[0-9a-f]{3}$/i.test(raw) || /^[0-9a-f]{6}$/i.test(raw)) return `#${raw}`
  if (/^#[0-9a-f]{3,8}$/i.test(raw)) return raw
  if (/^rgb(a)?\(/i.test(raw) || /^hsl(a)?\(/i.test(raw)) return raw
  if (/^linear-gradient\(/i.test(raw) || /^radial-gradient\(/i.test(raw)) return raw

  return 'var(--color-albatha-midnight)'
}

export default function AboutOriginSection({section}: {section?: AboutPageOriginSection | null}) {
  if (!section) return null

  const imageRef = section.image?.asset?._ref
  const imageAlt = section.image?.alt || section.heading || 'About origin image'
  const ctaHref = resolveContentLinkHref(section.ctaLink || null) || '#'
  const ctaExternal = isExternalContentLink(section.ctaLink || null)
  const sectionBackground = resolveSectionBackground(section.backgroundColor)

  return (
    <section
      className="px-4 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24 lg:px-[160px] lg:pb-[100px] lg:pt-[120px]"
      style={{background: sectionBackground}}
    >
      <SectionContainer className="flex flex-col gap-10 lg:h-[800px] lg:flex-row lg:items-center lg:gap-[65px]">
        <div className="relative overflow-hidden rounded-r-[24px] lg:h-[800px] lg:w-[754px] lg:rounded-r-[30px]">
          {imageRef ? (
            <>
              <SanityImage
                id={imageRef}
                alt={imageAlt}
                width={754}
                height={800}
                mode="cover"
                className="h-[360px] w-full object-cover md:h-[520px] lg:h-[800px]"
              />
              <div className="absolute inset-0 bg-[rgba(21,29,40,0.4)]" />
            </>
          ) : null}

          {section.imageBadgeLabel ? (
            <div className="absolute left-6 top-6 rounded-[8px] border border-white/70 px-[16px] py-[11px] lg:left-[89px] lg:top-[60px]">
              <p className="font-suse text-[14px] uppercase tracking-[0.02em] text-white lg:text-[20px]">
                {section.imageBadgeLabel}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-10 lg:w-[789px] lg:gap-[60px]">
          <div className="flex flex-col gap-6 lg:gap-10">
            <SectionTitle className="font-suse text-[30px] leading-[1.3] text-[var(--color-albatha-white)] lg:text-[40px]">
              {section.heading}
            </SectionTitle>
            <SectionBody
              text={section.body}
              splitByParagraphs
              className="space-y-5 font-suse text-[20px] leading-[1.35] text-[var(--color-albatha-white)] lg:text-[26px]"
            />
          </div>

          <SplitArrowLink
            href={ctaHref}
            label={section.ctaLabel || ''}
            target={ctaExternal && section.ctaLink?.openInNewTab ? '_blank' : undefined}
            rel={ctaExternal && section.ctaLink?.openInNewTab ? 'noopener noreferrer' : undefined}
            labelClassName="inline-flex h-[64px] min-w-[260px] items-center justify-center border border-white/70 bg-transparent px-8 font-suse text-[18px] uppercase text-white lg:h-[77px] lg:min-w-[287px] lg:text-[22px]"
            arrowClassName="inline-flex h-[64px] w-[64px] items-center justify-center bg-[var(--color-albatha-orange)] text-[30px] text-white lg:h-[77px] lg:w-[72px] lg:text-[34px]"
          />
        </div>
      </SectionContainer>
    </section>
  )
}
