import Link from 'next/link'

type SplitArrowLinkProps = {
  href: string
  label: string
  target?: string
  rel?: string
  className?: string
  labelClassName?: string
  arrowClassName?: string
  arrowText?: string
}

export default function SplitArrowLink({
  href,
  label,
  target,
  rel,
  className,
  labelClassName,
  arrowClassName,
  arrowText = '->',
}: SplitArrowLinkProps) {
  return (
    <Link href={href} target={target} rel={rel} className={className || 'inline-flex w-fit items-stretch overflow-hidden rounded-[10px]'}>
      <span
        className={
          labelClassName ||
          'inline-flex h-[64px] min-w-[240px] items-center justify-center bg-[var(--color-albatha-midnight)] px-8 font-suse text-[18px] uppercase text-white md:min-w-[286px] md:text-[22px]'
        }
      >
        {label}
      </span>
      <span
        className={
          arrowClassName ||
          'inline-flex h-[64px] w-[64px] items-center justify-center bg-[var(--color-albatha-orange)] text-[30px] text-white md:w-[73px]'
        }
      >
        {arrowText}
      </span>
    </Link>
  )
}

