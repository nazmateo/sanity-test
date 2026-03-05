import SanityImage from '@/app/components/SanityImage'
import SectionBody from '@/app/components/sections/SectionBody'
import SectionContainer from '@/app/components/sections/SectionContainer'
import SplitArrowLink from '@/app/components/sections/SplitArrowLink'
import SectionTitle from '@/app/components/sections/SectionTitle'
import {type HomePageBelowFold} from '@/sanity/lib/types'
import {resolveContentLinkHref} from '@/sanity/lib/utils'

function statVariantClass(variant?: 'dark' | 'blue' | 'outline' | null) {
  if (variant === 'blue') {
    return 'bg-[var(--color-albatha-blue)] text-white'
  }
  if (variant === 'outline') {
    return 'border border-[var(--color-albatha-midnight)] bg-transparent text-[var(--color-albatha-midnight)]'
  }
  return 'bg-[var(--color-albatha-midnight)] text-white'
}

function statLabelClass(variant?: 'dark' | 'blue' | 'outline' | null) {
  if (variant === 'blue') {
    return 'text-[var(--color-albatha-midnight)]'
  }
  return 'text-[var(--color-albatha-blue)]'
}

const desktopHeightMap = ['h-[362px]', 'h-[218px]', 'h-[290px]', 'h-[290px]', 'h-[200px]', 'h-[380px]']

function StatCard({
  value,
  label,
  subLabel,
  variant,
  desktopHeightClass,
}: {
  value?: string | null
  label?: string | null
  subLabel?: string | null
  variant?: 'dark' | 'blue' | 'outline' | null
  desktopHeightClass?: string
}) {
  return (
    <article
      className={`flex min-h-[180px] flex-col justify-center rounded-[20px] px-8 py-8 text-center sm:text-left lg:px-[42px] ${statVariantClass(variant)} ${desktopHeightClass || 'h-[240px]'}`}
    >
      <p className="font-suse text-[52px] leading-[1.1] lg:text-[62px] xl:text-[80px]">{value}</p>
      <p className={`font-suse text-[22px] leading-[1.3] lg:text-[26px] ${statLabelClass(variant)}`}>{label}</p>
      {subLabel ? (
        <p className={`font-suse text-[22px] leading-[1.3] lg:text-[26px] ${statLabelClass(variant)}`}>
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
    <section className="bg-[var(--color-albatha-white)] px-4 pb-10 pt-16 md:px-8 md:pt-20 lg:pt-[100px]">
      <SectionContainer className="flex flex-col gap-12 lg:gap-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(360px,1fr)_minmax(520px,923px)] lg:items-center lg:gap-[65px]">
          <div className="relative overflow-hidden rounded-[20px] lg:h-[640px] lg:rounded-r-[30px]">
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

          <div className="flex flex-col gap-8 lg:gap-[60px]">
            <div className="flex flex-col gap-8 lg:gap-10">
              <SectionTitle
                as="p"
                className="font-suse text-[30px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[40px]"
              >
                {section.headline}
              </SectionTitle>
              <SectionBody
                text={section.description}
                className="font-suse text-[20px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[26px]"
              />
            </div>
            <SplitArrowLink href={ctaHref} label={ctaLabel} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
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

        <div className="hidden h-[600px] gap-5 lg:grid lg:grid-cols-3">
          <div className="flex h-full flex-col gap-5">
            {[stats[0], stats[1]].filter(Boolean).map((stat, index) => (
              <StatCard
                key={stat?._key || `desktop-col1-${index}`}
                value={stat?.value}
                label={stat?.label}
                subLabel={stat?.subLabel}
                variant={stat?.variant}
                desktopHeightClass={desktopHeightMap[index]}
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
                desktopHeightClass={desktopHeightMap[index + 2]}
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
                desktopHeightClass={desktopHeightMap[index + 4]}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
