import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import type { OperationResult } from '../types'

interface ResultPanelProps {
  result: OperationResult | null
  /** Override the default textarea output (e.g. for count frequency table) */
  children?: React.ReactNode
}

export default function ResultPanel({ result, children }: ResultPanelProps) {
  const [removedOpen, setRemovedOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!result) return null

  const text = result.items.join('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'result.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Box>
      {/* Stats chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {result.stats.map((stat, i) => (
          <Chip
            key={i}
            label={`${stat.label}: ${stat.value}`}
            color={stat.color === 'default' ? undefined : stat.color}
            size="small"
            variant="outlined"
          />
        ))}
      </Box>

      {/* Result area */}
      {children || (
        <>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'flex-end' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              disabled={!text}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              disabled={!text}
            >
              Download .txt
            </Button>
          </Box>
          <TextField
            multiline
            fullWidth
            value={text}
            minRows={10}
            maxRows={20}
            inputProps={{ readOnly: true, style: { fontFamily: 'monospace', fontSize: 13 } }}
            size="small"
          />
        </>
      )}

      {/* Removed / Duplicates */}
      {result.removed && result.removed.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'fit-content' }}
            onClick={() => setRemovedOpen(v => !v)}
          >
            <Typography variant="subtitle2" color="error.main">
              Removed / Duplicates ({result.removed.length})
            </Typography>
            <IconButton size="small">
              {removedOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </IconButton>
          </Box>
          <Collapse in={removedOpen} unmountOnExit>
            <TextField
              multiline
              fullWidth
              value={result.removed.join('\n')}
              minRows={3}
              maxRows={10}
              inputProps={{ readOnly: true, style: { fontFamily: 'monospace', fontSize: 13 } }}
              size="small"
              sx={{ mt: 1 }}
            />
          </Collapse>
        </Box>
      )}
    </Box>
  )
}
