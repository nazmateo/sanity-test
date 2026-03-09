import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import TimelineFeature from '@/app/components/sections/TimelineFeature'
import {type AboutPageTimelineSection} from '@/sanity/lib/types'

export default function AboutTimelineSection({section}: {section?: AboutPageTimelineSection | null}) {
  if (!section) return null

  const backgroundImageRef = section.backgroundImage?.asset?._ref
  const backgroundImageAlt = section.backgroundImage?.alt || 'About timeline background'
  const items = (section.timelineItems || []).slice(0, 10)

  return (
    <section className="timeline-shell">
      {backgroundImageRef ? (
        <div className="absolute inset-0">
          <SanityImage
            id={backgroundImageRef}
            alt={backgroundImageAlt}
            width={1952}
            height={1358}
            mode="cover"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <div className="surface-gradient-timeline absolute inset-0" />

      <SectionContainer className="relative z-10 flex flex-col gap-8 lg:gap-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-10">
          {items.map((item, index) => (
            <TimelineFeature
              key={item._key || `${item.year || 'year'}-${index}`}
              year={item.year}
              description={item.description}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
