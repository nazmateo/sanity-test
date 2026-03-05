import SectionBody from '@/app/components/sections/SectionBody'
import ChecklistPanel from '@/app/components/sections/ChecklistPanel'
import SectionContainer from '@/app/components/sections/SectionContainer'
import SplitArrowLink from '@/app/components/sections/SplitArrowLink'
import SectionTitle from '@/app/components/sections/SectionTitle'
import {type AboutPageWhoWeServeSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

function resolveSectionBackground(value?: string | null) {
  const raw = (value || '').trim()
  if (!raw) return 'var(--color-albatha-white)'
  if (/^[0-9a-f]{3}$/i.test(raw) || /^[0-9a-f]{6}$/i.test(raw)) return `#${raw}`
  return raw
}

export default function AboutWhoWeServeSection({
  section,
}: {
  section?: AboutPageWhoWeServeSection | null
}) {
  if (!section) return null

  const ctaHref = resolveContentLinkHref(section.ctaLink || null) || '#'
  const ctaExternal = isExternalContentLink(section.ctaLink || null)
  const audienceItems = (section.audienceItems || []).map((item) => item?.label).filter(Boolean)

  return (
    <section
      className="px-4 py-16 md:px-8 md:py-20 lg:py-[100px]"
      style={{background: resolveSectionBackground(section.backgroundColor)}}
    >
      <SectionContainer className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[90px]">
        <div className="flex w-full flex-col gap-8 lg:w-[923px] lg:gap-[60px]">
          <div className="flex flex-col gap-8 lg:gap-10">
            <SectionTitle className="font-suse text-[30px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[40px]">
              {section.heading}
            </SectionTitle>
            <SectionBody
              text={section.body}
              splitByParagraphs
              className="space-y-5 font-suse text-[20px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[26px]"
            />
          </div>

          <SplitArrowLink
            href={ctaHref}
            label={section.ctaLabel || ''}
            target={ctaExternal && section.ctaLink?.openInNewTab ? '_blank' : undefined}
            rel={ctaExternal && section.ctaLink?.openInNewTab ? 'noopener noreferrer' : undefined}
            labelClassName="inline-flex h-[64px] min-w-[260px] items-center justify-center bg-[var(--color-albatha-midnight)] px-8 font-suse text-[18px] uppercase text-white lg:h-[77px] lg:min-w-[287px] lg:text-[22px]"
            arrowClassName="inline-flex h-[64px] w-[64px] items-center justify-center bg-[var(--color-albatha-orange)] text-[30px] text-white lg:h-[77px] lg:w-[72px] lg:text-[34px]"
          />
        </div>

        <ChecklistPanel
          items={audienceItems}
          background={section.audiencePanelBackground}
          className="rounded-l-[20px] px-6 py-10 md:px-8 md:py-12 lg:h-[600px] lg:w-[677px] lg:pl-[30px] lg:pr-[75px] lg:py-[64px]"
        />
      </SectionContainer>
    </section>
  )
}

