import {type ReactNode} from 'react'

import {cn} from '@/app/components/lib/cn'

type SectionContainerProps = {
  children: ReactNode
  className?: string
}

export default function SectionContainer({children, className}: SectionContainerProps) {
  return <div className={cn('section-shell', className)}>{children}</div>
}
