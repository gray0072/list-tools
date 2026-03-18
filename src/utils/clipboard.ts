export async function readClipboard(): Promise<string> {
  return navigator.clipboard.readText()
}

export async function writeClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function downloadTxt(content: string, filename = 'result.txt'): void {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
