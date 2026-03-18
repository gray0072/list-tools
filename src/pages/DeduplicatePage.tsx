import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import useAppStore from '../store/useAppStore'
import ListInput from '../components/ListInput'
import ResultPanel from '../components/ResultPanel'
import type { OperationResult } from '../types'
import { deduplicateOp } from '../operations/deduplicate'

export default function DeduplicatePage() {
  const listA = useAppStore(s => s.listA)
  const setListA = useAppStore(s => s.setListA)
  const settings = useAppStore(s => s.settings)
  const liveMode = useAppStore(s => s.liveMode)

  const [result, setResult] = useState<OperationResult | null>(null)

  const run = useCallback(() => {
    setResult(deduplicateOp(listA, settings))
  }, [listA, settings])

  useEffect(() => {
    if (liveMode) run()
  }, [liveMode, run])

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Deduplicate
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Remove duplicate values from a list, keeping only the first occurrence.
      </Typography>
      <Divider sx={{ my: 2 }} />

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
