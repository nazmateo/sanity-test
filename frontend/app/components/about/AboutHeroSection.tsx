'use client'

import {useState} from 'react'
import Image from 'next/image'

import SanityImage from '@/app/components/SanityImage'
import SectionContainer from '@/app/components/sections/SectionContainer'
import {fileAssetRefToUrl} from '@/app/components/lib/sanityAsset'
import {type AboutPageHero} from '@/sanity/lib/types'

function PlayIcon() {
  return (
    <Image
      src="/images/play.png"
      alt="Play"
      width={106}
      height={117}
      className="h-[82px] w-[74px] md:h-[98px] md:w-[90px] lg:h-[117px] lg:w-[106px]"
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

  return (
    <section
      className="px-4 pb-16 pt-[180px] md:px-8 md:pb-20 md:pt-[220px] lg:px-[160px] lg:pb-[120px] lg:pt-[240px]"
      style={{background: section.backgroundColor || 'var(--color-albatha-white)'}}
    >
      <SectionContainer className="flex flex-col gap-10 lg:gap-[70px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[289px_1fr] lg:gap-[134px]">
          <div className="font-suse">
            <p className="text-[30px] leading-[1.3] text-[var(--color-albatha-midnight)]">
              {section.personName}
            </p>
            <p className="mt-4 text-[26px] leading-[1.3] text-[var(--color-albatha-blue)]">
              {section.personRole}
            </p>
          </div>
          <p className="font-suse text-[40px] leading-[1.1] text-[var(--color-albatha-midnight)] lg:text-[72px]">
            {'" '}
            {section.quote}
            {' "'}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[24px] lg:rounded-[36px]">
          {showVideo ? (
            <video
              className="h-[340px] w-full object-cover md:h-[500px] lg:h-[775px]"
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
              className="h-[340px] w-full object-cover md:h-[500px] lg:h-[775px]"
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

          <p className="absolute inset-x-0 bottom-8 text-center font-suse text-[26px] leading-[1.3] text-[var(--color-albatha-midnight)] lg:text-[40px]">
            {section.mediaCaption}
          </p>
        </div>
      </SectionContainer>
    </section>
  )
}
