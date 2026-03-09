'use client'

import {useState} from 'react'
import Image from 'next/image'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {resolveSurfaceClass} from '@/app/components/sections/theme'
import {fileAssetRefToUrl} from '@/app/components/lib/sanityAsset'
import {type AboutPageHero} from '@/sanity/lib/types'

function PlayIcon() {
  return (
    <Image
      src="/images/play.png"
      alt="Play"
      width={106}
      height={117}
        className="about-hero-play-icon"
      priority={false}
    />
  )
}

function PlayButton({onClick}: {onClick?: () => void}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center"
      aria-label="Play video"
    >
      <PlayIcon />
    </button>
  )
}

export default function AboutHeroSection({section}: {section?: AboutPageHero | null}) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!section) return null

  const imageRef = section.media?.image?.asset?._ref
  const videoRef = section.media?.videoFile?.asset?._ref
  const videoUrl = fileAssetRefToUrl(videoRef)
  const posterRef = section.posterImage?.asset?._ref || imageRef
  const posterAlt =
    section.posterImage?.alt || section.media?.image?.alt || section.quote || 'About hero media'
  const hasVideo = Boolean(videoUrl)
  const showVideo = hasVideo && isPlaying
  const surfaceClass = resolveSurfaceClass(section.backgroundColor, 'light')

  return (
    <section className={`about-hero-shell px-4 pb-16 md:px-8 ${surfaceClass}`}>
      <SectionContainer className="about-hero-layout">
        <div className="about-hero-grid">
          <div className="font-suse">
            <p className="about-hero-name">
              {section.personName}
            </p>
            <p className="about-hero-role">
              {section.personRole}
            </p>
          </div>
          <p className="about-hero-quote">
            {'" '}
            {section.quote}
            {' "'}
          </p>
        </div>

        <div className="about-hero-media">
          {showVideo ? (
            <video
              className="about-hero-media-asset"
              src={videoUrl || undefined}
              autoPlay
              controls
              playsInline
            />
          ) : posterRef ? (
            <SanityImage
              id={posterRef}
              alt={posterAlt}
              width={1596}
              height={775}
              mode="cover"
              className="about-hero-media-asset"
            />
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center">
            <span className="pointer-events-auto">
              {hasVideo ? (
                !isPlaying ? (
                  <PlayButton onClick={() => setIsPlaying(true)} />
                ) : null
              ) : null}
            </span>
          </div>

          <p className="about-hero-caption">
            {section.mediaCaption}
          </p>
        </div>
      </SectionContainer>
    </section>
  )
}
