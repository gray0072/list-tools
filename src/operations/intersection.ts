import type { OperationResult, Settings } from '../types'
import { parseList, normalize } from '../utils/parseList'

export function intersectionOp(rawA: string, rawB: string, settings: Settings): OperationResult {
  const a = parseList(rawA, settings)
  const b = parseList(rawB, settings)

  const aKeys = new Set(a.map(item => normalize(item, settings)))
  const bKeys = new Set(b.map(item => normalize(item, settings)))

  const result: string[] = []
  const usedKeys = new Set<string>()

  for (const item of a) {
    const key = normalize(item, settings)
    if (bKeys.has(key) && !usedKeys.has(key)) {
      result.push(item)
      usedKeys.add(key)
    }
  }

  const onlyInACount = [...aKeys].filter(k => !bKeys.has(k)).length
  const onlyInBCount = [...bKeys].filter(k => !aKeys.has(k)).length

  return {
    items: result,
    stats: [
      { label: 'Matches', value: result.length, color: 'success' },
      { label: 'Only in A', value: onlyInACount, color: 'warning' },
      { label: 'Only in B', value: onlyInBCount, color: 'warning' },
    ],
  }
}
