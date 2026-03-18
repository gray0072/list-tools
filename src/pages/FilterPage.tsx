import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import useAppStore from '../store/useAppStore'
import ListInput from '../components/ListInput'
import ResultPanel from '../components/ResultPanel'
import type { OperationResult, FilterMode } from '../types'
import { filterOp } from '../operations/filter'

export default function FilterPage() {
  const listA = useAppStore(s => s.listA)
  const setListA = useAppStore(s => s.setListA)
  const settings = useAppStore(s => s.settings)
  const liveMode = useAppStore(s => s.liveMode)

  const [pattern, setPattern] = useState('')
  const [mode, setMode] = useState<FilterMode>('include')
  const [useRegex, setUseRegex] = useState(false)
  const [result, setResult] = useState<OperationResult | null>(null)

  const run = useCallback(() => {
    setResult(filterOp(listA, settings, pattern, mode, useRegex))
  }, [listA, settings, pattern, mode, useRegex])

  useEffect(() => {
    if (liveMode) run()
  }, [liveMode, run])

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Filter / Search
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Keep or exclude lines matching a substring or regular expression.
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          label="Pattern"
          value={pattern}
          onChange={e => setPattern(e.target.value)}
          size="small"
          sx={{ minWidth: 260 }}
          placeholder={useRegex ? 'Regular expression…' : 'Substring…'}
        />
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          size="small"
        >
          <ToggleButton value="include">Include matches</ToggleButton>
          <ToggleButton value="exclude">Exclude matches</ToggleButton>
        </ToggleButtonGroup>
        <FormControlLabel
          control={<Switch checked={useRegex} onChange={e => setUseRegex(e.target.checked)} size="small" />}
          label="Regex"
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ListInput label="List" value={listA} onChange={setListA} />
        </Grid>
      </Grid>

      {!liveMode && (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={run} startIcon={<PlayArrowIcon />}>
            Apply
          </Button>
        </Box>
      )}

      {result && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <ResultPanel result={result} />
        </Box>
      )}
    </Box>
  )
}
