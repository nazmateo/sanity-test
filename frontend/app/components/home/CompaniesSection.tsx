import Link from 'next/link'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {type HomePageCompaniesSection} from '@/sanity/lib/types'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

function CompanyItem({
  title,
  label,
  href,
  external,
  openInNewTab,
}: {
  title?: string | null
  label?: string | null
  href?: string | null
  external?: boolean
  openInNewTab?: boolean | null
}) {
  const titleText = title || ''
  const labelText = label || ''

  return (
    <article className="border-b border-white/70 pb-3">
      <p className="font-suse text-[28px] leading-[1.3] text-white">{titleText}</p>
      {href ? (
        <Link
          href={href}
          className="mt-1 inline-block font-suse text-[18px] leading-[1.3] text-[var(--color-albatha-blue)]"
          target={external && openInNewTab ? '_blank' : undefined}
          rel={external && openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {labelText}
        </Link>
      ) : (
        <p className="mt-1 font-suse text-[18px] leading-[1.3] text-[var(--color-albatha-blue)]">
          {labelText}
        </p>
      )}
    </article>
  )
}

export default function CompaniesSection({section}: {section?: HomePageCompaniesSection | null}) {
  if (!section) return null

  const backgroundImageRef = section.backgroundImage?.asset?._ref
  const backgroundImageAlt = section.backgroundImage?.alt || 'Companies background'
  const companies = (section.companies || []).slice(0, 6)

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden px-4 pb-10 pt-16 md:min-h-[820px] md:px-8 md:pt-20 lg:min-h-[1085px] lg:px-0 lg:pb-10 lg:pt-[100px]"
      style={{backgroundColor: section.backgroundColor || 'var(--color-albatha-midnight)'}}
    >
      {backgroundImageRef ? (
        <div className="absolute inset-0">
          <SanityImage
            id={backgroundImageRef}
            alt={backgroundImageAlt}
            width={1920}
            height={1085}
            mode="cover"
            className="h-full w-full scale-[1.16] object-cover object-center"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(21,29,40,0.2)] to-[var(--color-albatha-midnight)]" />

      <SectionContainer className="relative z-10 mt-auto flex flex-col items-center gap-10 lg:gap-[60px]">
        <p className="max-w-[1200px] text-center font-suse text-[24px] leading-[1.3] text-white md:text-[30px] lg:text-[35px]">
          {section.heading}
        </p>

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
          {companies.map((item, index) => {
            const href = resolveContentLinkHref(item.link || null)
            const external = isExternalContentLink(item.link || null)
            return (
              <CompanyItem
                key={item._key || `${item.title || 'company'}-${index}`}
                title={item.title}
                label={item.label}
                href={href}
                external={external}
                openInNewTab={item.link?.openInNewTab}
              />
            )
          })}
        </div>
      </SectionContainer>
    </section>
  )
}
