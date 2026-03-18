import type { OperationResult, Settings } from '../types'
import { parseList, normalize } from '../utils/parseList'

export function symmetricOp(rawA: string, rawB: string, settings: Settings): OperationResult {
  const a = parseList(rawA, settings)
  const b = parseList(rawB, settings)

  const aKeys = new Set(a.map(item => normalize(item, settings)))
  const bKeys = new Set(b.map(item => normalize(item, settings)))

  const onlyInA: string[] = []
  const onlyInB: string[] = []
  const seenA = new Set<string>()
  const seenB = new Set<string>()

  for (const item of a) {
    const key = normalize(item, settings)
    if (!bKeys.has(key) && !seenA.has(key)) {
      onlyInA.push(item)
      seenA.add(key)
    }
  }

  for (const item of b) {
    const key = normalize(item, settings)
    if (!aKeys.has(key) && !seenB.has(key)) {
      onlyInB.push(item)
      seenB.add(key)
    }
  }

  return {
    items: [...onlyInA, ...onlyInB],
    onlyInA,
    onlyInB,
    stats: [
      { label: 'Only in A', value: onlyInA.length, color: 'info' },
      { label: 'Only in B', value: onlyInB.length, color: 'warning' },
      { label: 'Total', value: onlyInA.length + onlyInB.length, color: 'success' },
    ],
  }
}
