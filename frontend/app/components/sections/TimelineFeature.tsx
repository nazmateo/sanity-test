type TimelineFeatureProps = {
  year?: string | null
  description?: string | null
}

export default function TimelineFeature({year, description}: TimelineFeatureProps) {
  return (
    <article className="timeline-feature">
      <div className="space-y-3">
        <p className="timeline-feature-year">
          {year}
        </p>
        <p className="timeline-feature-description">{description}</p>
      </div>
      <div className="mt-4 h-px w-full bg-white/60" />
    </article>
  )
}
