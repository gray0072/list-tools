import type { OperationResult, Settings, SortOrder } from '../types'
import { parseList } from '../utils/parseList'

export function sortOp(rawA: string, settings: Settings, order: SortOrder): OperationResult {
  const a = parseList(rawA, settings)

  let result: string[]

  if (order === 'shuffle') {
    result = [...a]
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]]
    }
  } else if (order === 'len-asc') {
    result = [...a].sort((x, y) => x.length - y.length)
  } else if (order === 'len-desc') {
    result = [...a].sort((x, y) => y.length - x.length)
  } else {
    result = [...a].sort((x, y) => {
      const xa = settings.ignoreCase ? x.toLowerCase() : x
      const ya = settings.ignoreCase ? y.toLowerCase() : y
      return order === 'az' ? xa.localeCompare(ya) : ya.localeCompare(xa)
    })
  }

  return {
    items: result,
    stats: [{ label: 'Items', value: result.length, color: 'success' }],
  }
}
