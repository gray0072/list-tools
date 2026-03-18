import type { OperationResult, Settings } from '../types'
import { parseList, normalize } from '../utils/parseList'

export function unionOp(rawA: string, rawB: string, settings: Settings): OperationResult {
  const a = parseList(rawA, settings)
  const b = parseList(rawB, settings)

  const seen = new Map<string, string>() // norm key -> first original value
  const result: string[] = []

  for (const item of [...a, ...b]) {
    const key = normalize(item, settings)
    if (!seen.has(key)) {
      seen.set(key, item)
      result.push(item)
    }
  }

  const duplicates = a.length + b.length - result.length

  return {
    items: result,
    stats: [
      { label: 'List A', value: a.length, color: 'info' },
      { label: 'List B', value: b.length, color: 'info' },
      { label: 'Result', value: result.length, color: 'success' },
      ...(duplicates > 0
        ? [{ label: 'Duplicates removed', value: duplicates, color: 'warning' as const }]
        : []),
    ],
  }
}
