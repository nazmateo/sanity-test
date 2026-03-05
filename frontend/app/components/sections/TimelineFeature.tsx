type TimelineFeatureProps = {
  year?: string | null
  description?: string | null
}

export default function TimelineFeature({year, description}: TimelineFeatureProps) {
  return (
    <article className="flex min-h-[120px] flex-col justify-between pb-2">
      <div className="space-y-3">
        <p className="font-suse text-[20px] font-bold leading-[1.3] text-[var(--color-albatha-blue)]">
          {year}
        </p>
        <p className="font-suse text-[24px] leading-[1.2] text-white">{description}</p>
      </div>
      <div className="mt-4 h-px w-full bg-white/60" />
    </article>
  )
}

