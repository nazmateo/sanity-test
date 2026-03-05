import {type ReactNode} from 'react'

type SectionContainerProps = {
  children: ReactNode
  className?: string
}

export default function SectionContainer({children, className}: SectionContainerProps) {
  return <div className={`mx-auto w-full max-w-[1600px] ${className || ''}`.trim()}>{children}</div>
}

