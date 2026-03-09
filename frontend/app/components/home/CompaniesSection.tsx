import Link from 'next/link'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {resolveSurfaceClass} from '@/app/components/sections/theme'
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
      <p className="type-company-title text-on-dark">{titleText}</p>
      {href ? (
        <Link
          href={href}
          className="type-company-link mt-1 inline-block text-accent"
          target={external && openInNewTab ? '_blank' : undefined}
          rel={external && openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {labelText}
        </Link>
      ) : (
        <p className="type-company-link mt-1 text-accent">
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
  const surfaceClass = resolveSurfaceClass(section.backgroundColor, 'midnight')

  return (
    <section className={`companies-shell ${surfaceClass}`}>
      {backgroundImageRef ? (
        <div className="absolute inset-0">
          <SanityImage
            id={backgroundImageRef}
            alt={backgroundImageAlt}
            width={1920}
            height={1085}
            mode="cover"
            className="companies-overlay-image h-full w-full object-cover object-center"
          />
        </div>
      ) : null}
      <div className="surface-gradient-companies absolute inset-0" />

      <SectionContainer className="companies-content">
        <p className="companies-heading">
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
