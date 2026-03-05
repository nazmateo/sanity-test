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
    <section className="bg-[var(--color-albatha-white)] px-4 py-16 md:px-8 lg:px-[159px] lg:py-[100px]">
      <SectionContainer className="flex max-w-[1601px] flex-col gap-10 lg:gap-20">
        <p className="max-w-[884px] font-suse text-[30px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[40px]">
          {section.heading}
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[977px_517px] lg:items-end lg:justify-between lg:gap-[106px]">
          <div className="overflow-hidden rounded-[20px]">
            {leftImageRef ? (
              <SanityImage
                id={leftImageRef}
                alt={leftImageAlt}
                width={977}
                height={618}
                mode="cover"
                className="h-[420px] w-full object-cover lg:h-[618px]"
              />
            ) : null}
          </div>

          <Link href={rightHref} className="group relative block" aria-label="Open sector">
            <div className="overflow-hidden rounded-[20px]">
              {rightImageRef ? (
                <SanityImage
                  id={rightImageRef}
                  alt={rightImageAlt}
                  width={517}
                  height={606}
                  mode="cover"
                  className="h-[420px] w-full object-cover lg:h-[606px]"
                />
              ) : null}
            </div>
            <span className="absolute bottom-0 right-0 inline-flex h-[78px] w-[87px] items-center justify-center rounded-[10px] bg-[var(--color-albatha-orange)] text-[36px] leading-none text-white transition-transform duration-200 group-hover:translate-x-0.5">
              {'->'}
            </span>
          </Link>
        </div>
      </SectionContainer>
    </section>
  )
}
