import SectionBody from '@/app/components/sections/SectionBody'
import SectionContainer from '@/app/components/sections/SectionContainer'
import LeadershipProfileCard from '@/app/components/sections/LeadershipProfileCard'
import SplitArrowLink from '@/app/components/sections/SplitArrowLink'
import {resolveSurfaceClass} from '@/app/components/sections/theme'
import SectionTitle from '@/app/components/sections/SectionTitle'
import {type AboutPageLeadershipSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

export default function AboutLeadershipSection({section}: {section?: AboutPageLeadershipSection | null}) {
  if (!section) return null

  const ctaHref = resolveContentLinkHref(section.ctaLink || null) || '#'
  const ctaExternal = isExternalContentLink(section.ctaLink || null)
  const leaders = (section.leaders || []).slice(0, 4)
  const surfaceClass = resolveSurfaceClass(section.backgroundColor, 'light')

  return (
    <section className={`about-origin-shell px-4 md:px-8 ${surfaceClass}`}>
      <SectionContainer className="flex flex-col gap-12 lg:gap-20">
        <div className="flex max-w-5xl flex-col gap-8 lg:gap-10">
          <SectionTitle>{section.heading}</SectionTitle>
          <SectionBody text={section.body} />
          <SplitArrowLink
            href={ctaHref}
            label={section.ctaLabel || ''}
            target={ctaExternal && section.ctaLink?.openInNewTab ? '_blank' : undefined}
            rel={ctaExternal && section.ctaLink?.openInNewTab ? 'noopener noreferrer' : undefined}
            labelClassName="split-arrow-link-label"
            arrowClassName="split-arrow-link-arrow"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {leaders.map((leader, index) => (
            <LeadershipProfileCard
              key={leader._key || `${leader.name || 'leader'}-${index}`}
              name={leader.name}
              role={leader.role}
              bio={leader.bio}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
