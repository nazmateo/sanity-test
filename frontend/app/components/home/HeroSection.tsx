import Link from 'next/link'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {resolveSurfaceClass} from '@/app/components/sections/theme'
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
  const surfaceClass = resolveSurfaceClass(undefined, 'midnight')
  const media = hero?.backgroundMedia
  const mediaType = media?.mediaType || 'image'
  const imageRef = media?.image?.asset?._ref
  const imageAlt = media?.image?.alt || ''
  const videoRef = media?.videoFile?.asset?._ref
  const videoUrl = fileAssetRefToUrl(videoRef)

  return (
    <section className={`hero-shell relative overflow-hidden text-white ${surfaceClass}`}>
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

      <SectionContainer className="hero-inner relative flex flex-col px-4 sm:px-6 md:px-8">
        {phrases[0] ? (
          <span
            className="hero-phrase hero-phrase-delay-0 hero-phrase-one absolute hidden lg:inline-flex"
          >
            {phrases[0]}
          </span>
        ) : null}
        {phrases[1] ? (
          <span
            className="hero-phrase hero-phrase-delay-1 hero-phrase-two absolute hidden lg:inline-flex"
          >
            {phrases[1]}
          </span>
        ) : null}
        {phrases[2] ? (
          <span
            className="hero-phrase hero-phrase-delay-2 hero-phrase-three absolute hidden lg:inline-flex"
          >
            {phrases[2]}
          </span>
        ) : null}

        <div className="flex-1" />

        <div className="hero-copy-grid mb-20 grid grid-cols-1 gap-8 md:mb-28 lg:items-end">
          <h1 className="type-display-hero">
            {headlineLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < headlineLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <p className="hero-description">
            {description}
          </p>
        </div>

        <div className="mb-6 flex justify-end md:mb-8">
          <Link
            href={ctaHref}
            className="hero-cta inline-flex items-center gap-2 transition-colors hover:bg-white/30"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden className="hero-cta-icon">
              v
            </span>
          </Link>
        </div>
      </SectionContainer>
    </section>
  )
}
