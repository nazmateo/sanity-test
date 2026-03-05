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
    return <p className={className}>{text}</p>
  }

  const paragraphs = text.split(/\n\s*\n/g).filter(Boolean)
  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 24)}-${index}`} className={paragraphClassName}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}

