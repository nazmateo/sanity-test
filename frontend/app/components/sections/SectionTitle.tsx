type SectionTitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children?: string | null
  className?: string
}

export default function SectionTitle({as = 'h2', children, className}: SectionTitleProps) {
  if (!children) return null
  const Tag = as
  return <Tag className={className}>{children}</Tag>
}

