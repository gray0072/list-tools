import type { OperationResult, Settings } from '../types'
import { parseList, normalize } from '../utils/parseList'

export function deduplicateOp(rawA: string, settings: Settings): OperationResult {
  const a = parseList(rawA, settings)

  const seen = new Set<string>()
  const result: string[] = []
  const removed: string[] = []

  for (const item of a) {
    const key = normalize(item, settings)
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    } else {
      removed.push(item)
    }
  }

  return {
    items: result,
    stats: [
      { label: 'Original', value: a.length, color: 'info' },
      { label: 'Unique', value: result.length, color: 'success' },
      { label: 'Duplicates removed', value: removed.length, color: 'warning' },
    ],
    removed,
  }
}
