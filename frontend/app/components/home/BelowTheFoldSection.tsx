import SanityImage from '@/app/components/SanityImage'
import {cn} from '@/app/components/lib/cn'
import SectionBody from '@/app/components/sections/SectionBody'
import SectionContainer from '@/app/components/sections/SectionContainer'
import SplitArrowLink from '@/app/components/sections/SplitArrowLink'
import SectionTitle from '@/app/components/sections/SectionTitle'
import {type HomePageBelowFold} from '@/sanity/lib/types'
import {resolveContentLinkHref} from '@/sanity/lib/utils'

function statVariantClass(variant?: 'dark' | 'blue' | 'outline' | null) {
  if (variant === 'blue') {
    return 'stat-card-blue'
  }
  if (variant === 'outline') {
    return 'stat-card-outline'
  }
  return 'stat-card-dark'
}

function statLabelClass(variant?: 'dark' | 'blue' | 'outline' | null) {
  if (variant === 'blue') {
    return 'stat-label-blue'
  }
  return 'stat-label-default'
}

function StatCard({
  value,
  label,
  subLabel,
  variant,
}: {
  value?: string | null
  label?: string | null
  subLabel?: string | null
  variant?: 'dark' | 'blue' | 'outline' | null
}) {
  return (
    <article className={cn('stat-card sm:text-left', statVariantClass(variant))}>
      <p className="type-stat-value">{value}</p>
      <p className={cn('type-stat-label', statLabelClass(variant))}>{label}</p>
      {subLabel ? (
        <p className={cn('type-stat-label', statLabelClass(variant))}>
          {subLabel}
        </p>
      ) : null}
    </article>
  )
}

export default function BelowTheFoldSection({section}: {section?: HomePageBelowFold | null}) {
  if (!section) return null

  const introImageRef = section.introImage?.asset?._ref
  const introImageAlt = section.introImage?.alt || section.headline || 'Below the fold image'
  const ctaHref = resolveContentLinkHref(section.ctaLink || null) || '#'
  const ctaLabel = section.ctaLabel || 'About Us'
  const stats = (section.stats || []).slice(0, 6)

  return (
    <section className="below-fold-shell surface-page px-4 md:px-8">
      <SectionContainer className="flex flex-col gap-12 lg:gap-20">
        <div className="below-fold-grid">
          <div className="below-fold-media">
            {introImageRef ? (
              <SanityImage
                id={introImageRef}
                alt={introImageAlt}
                width={757}
                height={640}
                mode="cover"
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="below-fold-copy">
            <div className="flex flex-col gap-8 lg:gap-10">
              <SectionTitle
                as="p"
                className="text-ink"
              >
                {section.headline}
              </SectionTitle>
              <SectionBody text={section.description} />
            </div>
            <SplitArrowLink href={ctaHref} label={ctaLabel} />
          </div>
        </div>

        <div className="below-fold-mobile-stats sm:grid-cols-2">
          {stats.map((stat, index) => (
            <StatCard
              key={stat._key || `${stat.value || 'stat'}-${index}`}
              value={stat.value}
              label={stat.label}
              subLabel={stat.subLabel}
              variant={stat.variant}
            />
          ))}
        </div>

        <div className="below-fold-desktop-stats">
          <div className="flex h-full flex-col gap-5">
            {[stats[0], stats[1]].filter(Boolean).map((stat, index) => (
              <StatCard
                key={stat?._key || `desktop-col1-${index}`}
                value={stat?.value}
                label={stat?.label}
                subLabel={stat?.subLabel}
                variant={stat?.variant}
              />
            ))}
          </div>
          <div className="flex h-full flex-col gap-5">
            {[stats[2], stats[3]].filter(Boolean).map((stat, index) => (
              <StatCard
                key={stat?._key || `desktop-col2-${index}`}
                value={stat?.value}
                label={stat?.label}
                subLabel={stat?.subLabel}
                variant={stat?.variant}
              />
            ))}
          </div>
          <div className="flex h-full flex-col gap-5">
            {[stats[4], stats[5]].filter(Boolean).map((stat, index) => (
              <StatCard
                key={stat?._key || `desktop-col3-${index}`}
                value={stat?.value}
                label={stat?.label}
                subLabel={stat?.subLabel}
                variant={stat?.variant}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
