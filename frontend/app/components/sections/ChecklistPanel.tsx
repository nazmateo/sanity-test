import {cn} from '@/app/components/lib/cn'
import {resolveSurfaceClass} from '@/app/components/sections/theme'

type ChecklistPanelProps = {
  items?: Array<string | null | undefined>
  background?: string | null
  className?: string
}

export default function ChecklistPanel({items, background, className}: ChecklistPanelProps) {
  const filteredItems = (items || []).filter(Boolean) as string[]
  if (filteredItems.length === 0) return null

  return (
    <div
      className={cn(
        resolveSurfaceClass(background, 'blue'),
        'about-checklist-panel text-white',
        className
      )}
    >
      <ul className="flex flex-col gap-5 lg:gap-5">
        {filteredItems.map((item, index) => (
          <li key={`${item.slice(0, 24)}-${index}`} className="checklist-item">
            <span aria-hidden className="checklist-check">
              ✓
            </span>
            <span className="checklist-text">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
