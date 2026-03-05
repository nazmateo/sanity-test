type PostContentProps = {
  excerpt?: string | null
}

export default function PostContent({excerpt}: PostContentProps) {
  return (
    <section className="bg-[var(--color-albatha-white)] px-4 py-12 md:px-8 md:py-16 lg:px-[160px] lg:py-[90px]">
      <div className="mx-auto w-full max-w-[1600px]">
        <article className="max-w-[980px]">
          <p className="font-suse text-[22px] leading-[1.4] text-[var(--color-albatha-midnight)] md:text-[26px] lg:text-[32px]">
            {excerpt || ''}
          </p>
        </article>
      </div>
    </section>
  )
}
