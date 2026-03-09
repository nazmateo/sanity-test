import {cn} from '@/app/components/lib/cn'

type SectionBodyProps = {
  text?: string | null
  splitByParagraphs?: boolean
  className?: string
  paragraphClassName?: string
}

export default function SectionBody({
  text,
  splitByParagraphs = false,
  className,
  paragraphClassName,
}: SectionBodyProps) {
  if (!text) return null

  if (!splitByParagraphs) {
    return <p className={cn('section-body', className)}>{text}</p>
  }

  const paragraphs = text.split(/\n\s*\n/g).filter(Boolean)
  return (
    <div className={cn('section-body', className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 24)}-${index}`} className={cn('section-body', paragraphClassName)}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}
