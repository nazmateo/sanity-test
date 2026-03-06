type LeadershipProfileCardProps = {
  name?: string | null
  role?: string | null
  bio?: string | null
}

export default function LeadershipProfileCard({name, role, bio}: LeadershipProfileCardProps) {
  return (
    <article className="flex h-full flex-col gap-8 pr-0 lg:pr-5">
      <div className="flex flex-col gap-4">
        <h3 className="font-suse text-[30px] leading-[1.3] text-[var(--color-albatha-midnight)]">{name}</h3>
        <p className="font-suse text-[26px] leading-[1.3] text-[var(--color-albatha-blue)]">{role}</p>
      </div>
      <p className="font-suse text-[26px] leading-[1.3] text-[var(--color-albatha-midnight)]">{bio}</p>
    </article>
  )
}

