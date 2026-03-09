import Link from 'next/link'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {type HomePageSectorsSection} from '@/sanity/lib/types'
import {resolveContentLinkHref} from '@/sanity/lib/utils'

export default function SectorsSection({section}: {section?: HomePageSectorsSection | null}) {
  if (!section) return null

  const rightHref = resolveContentLinkHref(section.rightImageLink || null) || '#'
  const leftImageRef = section.leftImage?.asset?._ref
  const leftImageAlt = section.leftImage?.alt || 'Left image'
  const rightImageRef = section.rightImage?.asset?._ref
  const rightImageAlt = section.rightImage?.alt || 'Right image'

  return (
    <section className="sectors-shell surface-page px-4 md:px-8">
      <SectionContainer className="flex flex-col gap-10 lg:gap-20">
        <p className="type-section-title sectors-heading text-ink">{section.heading}</p>

        <div className="sectors-grid">
          <div className="sectors-card">
            {leftImageRef ? (
              <SanityImage
                id={leftImageRef}
                alt={leftImageAlt}
                width={977}
                height={618}
                mode="cover"
                className="sectors-image"
              />
            ) : null}
          </div>

          <Link href={rightHref} className="group relative block" aria-label="Open sector">
            <div className="sectors-card">
              {rightImageRef ? (
                <SanityImage
                  id={rightImageRef}
                  alt={rightImageAlt}
                  width={517}
                  height={606}
                  mode="cover"
                  className="sectors-image"
                />
              ) : null}
            </div>
            <span className="sectors-link-arrow group-hover:translate-x-0.5">
              {'->'}
            </span>
          </Link>
        </div>
      </SectionContainer>
    </section>
  )
}
