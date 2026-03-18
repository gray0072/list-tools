import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import ClearIcon from '@mui/icons-material/Clear'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'

interface ListInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  onSwap?: () => void
  minRows?: number
}

export default function ListInput({ label, value, onChange, onSwap, minRows = 10 }: ListInputProps) {
  const lineCount = value ? value.split('\n').filter(l => l.trim().length > 0).length : 0

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
    } catch {
      // Clipboard permission denied — silently ignore
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 0.5 }}>
        <Typography variant="subtitle2" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {label}
        </Typography>
        {onSwap && (
          <Tooltip title="Swap A and B">
            <IconButton size="small" onClick={onSwap}>
              <SwapHorizIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Paste from clipboard">
          <IconButton size="small" onClick={handlePaste}>
            <ContentPasteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear">
          <span>
            <IconButton size="small" onClick={() => onChange('')} disabled={!value}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      <TextField
        multiline
        fullWidth
        minRows={minRows}
        maxRows={20}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="One item per line…"
        size="small"
        inputProps={{ style: { fontFamily: 'monospace', fontSize: 13 } }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
        {lineCount} {lineCount === 1 ? 'line' : 'lines'}
      </Typography>
    </Box>
  )
}
