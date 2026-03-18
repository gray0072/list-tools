export type Separator = 'auto' | 'newline' | 'comma' | 'semicolon'
export type ThemeMode = 'light' | 'dark' | 'system'
export type SortOrder = 'az' | 'za' | 'len-asc' | 'len-desc' | 'shuffle'
export type FilterMode = 'include' | 'exclude'

export interface Settings {
  ignoreCase: boolean
  trimWhitespace: boolean
  ignoreEmpty: boolean
  separator: Separator
}

export interface StatItem {
  label: string
  value: number | string
  color: 'success' | 'warning' | 'error' | 'info' | 'default'
}

export interface OperationResult {
  items: string[]
  stats: StatItem[]
  removed?: string[]
  onlyInA?: string[]
  onlyInB?: string[]
}

export interface CountEntry {
  value: string
  count: number
}

export interface CountResult extends OperationResult {
  entries: CountEntry[]
  maxCount: number
}
