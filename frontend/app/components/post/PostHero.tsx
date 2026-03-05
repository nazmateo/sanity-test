import SanityImage from '@/app/components/SanityImage'

type PostHeroProps = {
  title?: string | null
  publishedAt?: string | null
  imageRef?: string | null
  imageAlt?: string | null
}

export default function PostHero({title, publishedAt, imageRef, imageAlt}: PostHeroProps) {
  return (
    <section className="bg-[var(--color-albatha-midnight)] px-4 pb-10 pt-12 md:px-8 md:pt-16 lg:px-[160px] lg:pb-14 lg:pt-[80px]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:gap-10">
        <p className="font-suse text-[18px] leading-[1.3] text-white/70 lg:text-[22px]">
          {publishedAt || ''}
        </p>
        <h1 className="max-w-[1200px] font-suse text-[34px] leading-[1.2] text-white md:text-[46px] lg:text-[62px]">
          {title}
        </h1>
        {imageRef ? (
          <div className="overflow-hidden rounded-[20px]">
            <SanityImage
              id={imageRef}
              alt={imageAlt || title || 'Post image'}
              width={1600}
              height={760}
              mode="cover"
              className="h-[320px] w-full object-cover md:h-[460px] lg:h-[760px]"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
