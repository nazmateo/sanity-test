import Link from 'next/link'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {fileAssetRefToUrl} from '@/app/components/lib/sanityAsset'
import {type HomePageHero} from '@/sanity/lib/types'
import {resolveContentLinkHref} from '@/sanity/lib/utils'

export default function HeroSection({hero}: {hero?: HomePageHero | null}) {
  const headline = hero?.headline || 'Business\nwith Values'
  const headlineLines = headline.split('\n')
  const description =
    hero?.description ||
    'Albatha is a Sharjah-born family of companies serving communities across the region, built on shared values and 70 years of trust.'
  const phrases = (hero?.phrases || []).slice(0, 3)
  const ctaLabel = hero?.ctaLabel || 'Know More'
  const ctaHref = resolveContentLinkHref(hero?.ctaLink || null) || '#'
  const media = hero?.backgroundMedia
  const mediaType = media?.mediaType || 'image'
  const imageRef = media?.image?.asset?._ref
  const imageAlt = media?.image?.alt || ''
  const videoRef = media?.videoFile?.asset?._ref
  const videoUrl = fileAssetRefToUrl(videoRef)

  return (
    <section className="relative min-h-[85svh] overflow-hidden bg-[#151d28] text-white md:min-h-[960px] xl:min-h-[1071px]">
      {mediaType === 'video' && videoUrl ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : imageRef ? (
        <SanityImage
          id={imageRef}
          alt={imageAlt}
          width={1920}
          height={1080}
          mode="cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-black/35" aria-hidden />

      <SectionContainer className="relative flex min-h-[85svh] flex-col px-4 sm:px-6 md:min-h-[960px] md:px-8 xl:min-h-[1071px]">
        {phrases[0] ? (
          <span
            className="absolute left-[20%] top-[275px] hidden rounded-[999px] border border-white/45 px-4 py-[11px] font-suse text-[20px] uppercase tracking-[0.02em] lg:inline-flex"
            style={{
              opacity: 0,
              transform: 'translateX(24px)',
              animation: 'heroPhraseCascade 2s ease-out forwards',
              animationDelay: '0ms',
            }}
          >
            {phrases[0]}
          </span>
        ) : null}
        {phrases[1] ? (
          <span
            className="absolute right-[16%] top-[540px] hidden rounded-[999px] border border-white/45 px-4 py-[11px] font-suse text-[20px] uppercase tracking-[0.02em] lg:inline-flex"
            style={{
              opacity: 0,
              transform: 'translateX(24px)',
              animation: 'heroPhraseCascade 2s ease-out forwards',
              animationDelay: '600ms',
            }}
          >
            {phrases[1]}
          </span>
        ) : null}
        {phrases[2] ? (
          <span
            className="absolute left-[4%] top-[960px] hidden rounded-[999px] border border-white/45 px-4 py-[11px] font-suse text-[20px] uppercase tracking-[0.02em] lg:inline-flex"
            style={{
              opacity: 0,
              transform: 'translateX(24px)',
              animation: 'heroPhraseCascade 2s ease-out forwards',
              animationDelay: '1200ms',
            }}
          >
            {phrases[2]}
          </span>
        ) : null}

        <div className="flex-1" />

        <div className="mb-20 grid grid-cols-1 gap-8 md:mb-28 lg:mb-[160px] lg:grid-cols-[1fr_517px] lg:items-end">
          <h1 className="font-suse text-[46px] leading-[0.95] sm:text-[64px] lg:text-[110px] xl:text-[140px]">
            {headlineLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < headlineLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <p className="max-w-[517px] font-suse text-[20px] leading-[1.3] text-white/95 sm:text-[24px] lg:text-[30px]">
            {description}
          </p>
        </div>

        <div className="mb-6 flex justify-end md:mb-8">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-[8px] bg-white/20 px-[10px] py-[10px] font-suse text-[16px] leading-none text-white transition-colors hover:bg-white/30 sm:text-[20px]"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden className="text-[14px]">
              v
            </span>
          </Link>
        </div>
      </SectionContainer>
    </section>
  )
}
