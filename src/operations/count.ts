import type { CountResult, Settings } from '../types'
import { parseList, normalize } from '../utils/parseList'

export function countOp(rawA: string, settings: Settings): CountResult {
  const a = parseList(rawA, settings)

  const map = new Map<string, { value: string; count: number }>()

  for (const item of a) {
    const key = normalize(item, settings)
    const entry = map.get(key)
    if (entry) {
      entry.count++
    } else {
      map.set(key, { value: item, count: 1 })
    }
  }

  const entries = [...map.values()].sort((x, y) => y.count - x.count)
  const maxCount = entries[0]?.count ?? 0

  return {
    items: entries.map(e => `${e.value}: ${e.count}`),
    entries,
    maxCount,
    stats: [
      { label: 'Total lines', value: a.length, color: 'info' },
      { label: 'Unique values', value: entries.length, color: 'success' },
      { label: 'Duplicates', value: a.length - entries.length, color: 'warning' },
    ],
  }
}
