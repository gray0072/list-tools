import type { Settings } from '../types'

export function parseList(raw: string, settings: Settings): string[] {
  if (!raw) return []

  let items: string[]

  switch (settings.separator) {
    case 'comma':
      items = raw.split(',')
      break
    case 'semicolon':
      items = raw.split(';')
      break
    case 'newline':
      items = raw.split('\n')
      break
    case 'auto':
    default: {
      const hasNewlines = raw.includes('\n')
      if (hasNewlines) {
        items = raw.split('\n')
      } else if (raw.includes(',')) {
        items = raw.split(',')
      } else if (raw.includes(';')) {
        items = raw.split(';')
      } else {
        items = [raw]
      }
      break
    }
  }

  if (settings.trimWhitespace) {
    items = items.map(i => i.trim())
  }

  if (settings.ignoreEmpty) {
    items = items.filter(i => i.length > 0)
  }

  return items
}

// Use for set-membership comparisons — returns a normalized key, NOT the display value
export function normalize(item: string, settings: Settings): string {
  let v = settings.trimWhitespace ? item.trim() : item
  if (settings.ignoreCase) v = v.toLowerCase()
  return v
}
