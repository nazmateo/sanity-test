import SectionBody from '@/app/components/sections/SectionBody'
import SectionContainer from '@/app/components/sections/SectionContainer'
import LeadershipProfileCard from '@/app/components/sections/LeadershipProfileCard'
import SplitArrowLink from '@/app/components/sections/SplitArrowLink'
import SectionTitle from '@/app/components/sections/SectionTitle'
import {type AboutPageLeadershipSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

function resolveSectionBackground(value?: string | null) {
  const raw = (value || '').trim()
  if (!raw) return 'var(--color-albatha-white)'
  if (/^[0-9a-f]{3}$/i.test(raw) || /^[0-9a-f]{6}$/i.test(raw)) return `#${raw}`
  return raw
}

export default function AboutLeadershipSection({section}: {section?: AboutPageLeadershipSection | null}) {
  if (!section) return null

  const ctaHref = resolveContentLinkHref(section.ctaLink || null) || '#'
  const ctaExternal = isExternalContentLink(section.ctaLink || null)
  const leaders = (section.leaders || []).slice(0, 4)

  return (
    <section
      className="px-4 pb-20 pt-16 md:px-8 md:pb-24 md:pt-20 lg:pb-[140px] lg:pt-[100px]"
      style={{background: resolveSectionBackground(section.backgroundColor)}}
    >
      <SectionContainer className="flex flex-col gap-12 lg:gap-20">
        <div className="flex max-w-[1060px] flex-col gap-8 lg:gap-10">
          <SectionTitle className="font-suse text-[30px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[40px]">
            {section.heading}
          </SectionTitle>
          <SectionBody
            text={section.body}
            className="font-suse text-[20px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[26px]"
          />
          <SplitArrowLink
            href={ctaHref}
            label={section.ctaLabel || ''}
            target={ctaExternal && section.ctaLink?.openInNewTab ? '_blank' : undefined}
            rel={ctaExternal && section.ctaLink?.openInNewTab ? 'noopener noreferrer' : undefined}
            labelClassName="inline-flex h-[64px] min-w-[260px] items-center justify-center bg-[var(--color-albatha-midnight)] px-8 font-suse text-[18px] uppercase text-white lg:h-[77px] lg:min-w-[287px] lg:text-[22px]"
            arrowClassName="inline-flex h-[64px] w-[64px] items-center justify-center bg-[var(--color-albatha-orange)] text-[30px] text-white lg:h-[77px] lg:w-[72px] lg:text-[34px]"
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

