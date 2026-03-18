import type { OperationResult, Settings, FilterMode } from '../types'
import { parseList } from '../utils/parseList'

export function filterOp(
  rawA: string,
  settings: Settings,
  pattern: string,
  mode: FilterMode,
  useRegex: boolean,
): OperationResult {
  const a = parseList(rawA, settings)

  if (!pattern.trim()) {
    return {
      items: a,
      stats: [{ label: 'Items', value: a.length, color: 'success' }],
    }
  }

  let test: (item: string) => boolean

  if (useRegex) {
    try {
      const flags = settings.ignoreCase ? 'i' : ''
      const re = new RegExp(pattern, flags)
      test = item => re.test(item)
    } catch {
      return {
        items: [],
        stats: [{ label: 'Invalid regex', value: pattern, color: 'error' }],
      }
    }
  } else {
    const p = settings.ignoreCase ? pattern.toLowerCase() : pattern
    test = item => {
      const v = settings.ignoreCase ? item.toLowerCase() : item
      return v.includes(p)
    }
  }

  const matched = a.filter(test)
  const unmatched = a.filter(i => !test(i))
  const result = mode === 'include' ? matched : unmatched

  return {
    items: result,
    stats: [
      { label: 'Matched', value: matched.length, color: 'info' },
      { label: mode === 'include' ? 'Result' : 'Excluded', value: result.length, color: 'success' },
      { label: 'Total', value: a.length, color: 'default' },
    ],
  }
}
