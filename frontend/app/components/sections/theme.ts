const SURFACE_CLASS_BY_TONE = {
  light: 'surface-albatha-white',
  midnight: 'surface-albatha-midnight',
  blue: 'surface-albatha-blue',
  orange: 'surface-albatha-orange',
} as const

type SurfaceTone = keyof typeof SURFACE_CLASS_BY_TONE

const COLOR_ALIASES: Record<string, SurfaceTone> = {
  '#f8f8f8': 'light',
  'var(--color-albatha-white)': 'light',
  '#151d28': 'midnight',
  'var(--color-albatha-midnight)': 'midnight',
  '#0daee4': 'blue',
  'var(--color-albatha-blue)': 'blue',
  '#f25e03': 'orange',
  'var(--color-albatha-orange)': 'orange',
}

function normalizeColorValue(value?: string | null) {
  return (value || '').trim().toLowerCase().replace(/\s+/g, '')
}

function resolveSurfaceTone(value: string | null | undefined, fallback: SurfaceTone) {
  const normalizedValue = normalizeColorValue(value)
  return COLOR_ALIASES[normalizedValue] || fallback
}

export function resolveSurfaceClass(value?: string | null, fallback: SurfaceTone = 'light') {
  return SURFACE_CLASS_BY_TONE[resolveSurfaceTone(value, fallback)]
}
