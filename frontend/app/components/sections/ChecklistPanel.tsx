type ChecklistPanelProps = {
  items?: Array<string | null | undefined>
  background?: string | null
  className?: string
}

function resolvePanelBackground(value?: string | null) {
  const raw = (value || '').trim()
  if (!raw) return 'var(--color-albatha-blue)'
  if (/^[0-9a-f]{3}$/i.test(raw) || /^[0-9a-f]{6}$/i.test(raw)) return `#${raw}`
  return raw
}

export default function ChecklistPanel({items, background, className}: ChecklistPanelProps) {
  const filteredItems = (items || []).filter(Boolean) as string[]
  if (filteredItems.length === 0) return null

  return (
    <div
      className={
        className ||
        'rounded-l-[20px] px-6 py-10 md:px-8 md:py-12 lg:h-[600px] lg:w-[677px] lg:rounded-l-[20px] lg:pl-[30px] lg:pr-[75px] lg:py-[64px]'
      }
      style={{background: resolvePanelBackground(background)}}
    >
      <ul className="flex flex-col gap-5 lg:gap-5">
        {filteredItems.map((item, index) => (
          <li
            key={`${item.slice(0, 24)}-${index}`}
            className="grid grid-cols-[20px_1fr] items-start gap-3 font-suse text-[20px] leading-[1.4] text-white lg:text-[26px]"
          >
            <span aria-hidden className="pt-0.5 text-[20px] leading-none lg:pt-1 lg:text-[26px]">
              ✓
            </span>
            <span className="text-[20px] leading-[1.35] lg:text-[26px]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
