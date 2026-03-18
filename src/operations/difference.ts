import type { OperationResult, Settings } from '../types'
import { parseList, normalize } from '../utils/parseList'

export function differenceOp(rawA: string, rawB: string, settings: Settings): OperationResult {
  const a = parseList(rawA, settings)
  const b = parseList(rawB, settings)

  const bKeys = new Set(b.map(item => normalize(item, settings)))
  const result: string[] = []
  const removed: string[] = []

  for (const item of a) {
    const key = normalize(item, settings)
    if (!bKeys.has(key)) {
      result.push(item)
    } else {
      removed.push(item)
    }
  }

  return {
    items: result,
    stats: [
      { label: 'List A', value: a.length, color: 'info' },
      { label: 'Result', value: result.length, color: 'success' },
      { label: 'Removed from A', value: removed.length, color: 'error' },
    ],
    removed,
  }
}
