type LeadershipProfileCardProps = {
  name?: string | null
  role?: string | null
  bio?: string | null
}

export default function LeadershipProfileCard({name, role, bio}: LeadershipProfileCardProps) {
  return (
    <article className="flex h-full flex-col gap-8 pr-0 lg:pr-5">
      <div className="flex flex-col gap-4">
        <h3 className="type-section-title text-ink">{name}</h3>
        <p className="type-section-body text-accent">{role}</p>
      </div>
      <p className="type-section-body text-ink">{bio}</p>
    </article>
  )
}
