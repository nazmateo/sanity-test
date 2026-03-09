import SectionBody from '@/app/components/sections/SectionBody'
import ChecklistPanel from '@/app/components/sections/ChecklistPanel'
import SectionContainer from '@/app/components/sections/SectionContainer'
import SplitArrowLink from '@/app/components/sections/SplitArrowLink'
import {resolveSurfaceClass} from '@/app/components/sections/theme'
import SectionTitle from '@/app/components/sections/SectionTitle'
import {type AboutPageWhoWeServeSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

export default function AboutWhoWeServeSection({
  section,
}: {
  section?: AboutPageWhoWeServeSection | null
}) {
  if (!section) return null

  const ctaHref = resolveContentLinkHref(section.ctaLink || null) || '#'
  const ctaExternal = isExternalContentLink(section.ctaLink || null)
  const audienceItems = (section.audienceItems || []).map((item) => item?.label).filter(Boolean)
  const surfaceClass = resolveSurfaceClass(section.backgroundColor, 'light')

  return (
    <section className={`about-origin-shell px-4 md:px-8 ${surfaceClass}`}>
      <SectionContainer className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex w-full flex-col gap-8 lg:max-w-4xl lg:gap-12">
          <div className="flex flex-col gap-8 lg:gap-10">
            <SectionTitle>{section.heading}</SectionTitle>
            <SectionBody
              text={section.body}
              splitByParagraphs
              className="space-y-5"
            />
          </div>

          <SplitArrowLink
            href={ctaHref}
            label={section.ctaLabel || ''}
            target={ctaExternal && section.ctaLink?.openInNewTab ? '_blank' : undefined}
            rel={ctaExternal && section.ctaLink?.openInNewTab ? 'noopener noreferrer' : undefined}
            labelClassName="split-arrow-link-label"
            arrowClassName="split-arrow-link-arrow"
          />
        </div>

        <ChecklistPanel
          items={audienceItems}
          background={section.audiencePanelBackground}
          className=""
        />
      </SectionContainer>
    </section>
  )
}
