import Link from 'next/link'

import {cn} from '@/app/components/lib/cn'

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
    <Link href={href} target={target} rel={rel} className={cn('split-arrow-link', className)}>
      <span
        className={cn('split-arrow-link-label', labelClassName)}
      >
        {label}
      </span>
      <span className={cn('split-arrow-link-arrow', arrowClassName)}>
        {arrowText}
      </span>
    </Link>
  )
}
