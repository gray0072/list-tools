import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import useAppStore from '../store/useAppStore'
import ListInput from './ListInput'
import ResultPanel from './ResultPanel'
import type { OperationResult, Settings } from '../types'

interface TwoListPageProps {
  title: string
  description: string
  compute: (rawA: string, rawB: string, settings: Settings) => OperationResult
}

export default function TwoListPage({ title, description, compute }: TwoListPageProps) {
  const listA = useAppStore(s => s.listA)
  const listB = useAppStore(s => s.listB)
  const setListA = useAppStore(s => s.setListA)
  const setListB = useAppStore(s => s.setListB)
  const swapLists = useAppStore(s => s.swapLists)
  const settings = useAppStore(s => s.settings)
  const liveMode = useAppStore(s => s.liveMode)

  const [result, setResult] = useState<OperationResult | null>(null)

  const run = useCallback(() => {
    setResult(compute(listA, listB, settings))
  }, [compute, listA, listB, settings])

  useEffect(() => {
    if (liveMode) run()
  }, [liveMode, run])

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <ListInput label="List A" value={listA} onChange={setListA} onSwap={swapLists} />
        </Grid>
        <Grid item xs={12} md={5}>
          <ListInput label="List B" value={listB} onChange={setListB} />
        </Grid>
        {!liveMode && (
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              onClick={run}
              startIcon={<PlayArrowIcon />}
              fullWidth
              sx={{ mt: { xs: 0, md: 3.5 } }}
            >
              Apply
            </Button>
          </Grid>
        )}
      </Grid>

      {result && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <ResultPanel result={result} />
        </Box>
      )}
    </Box>
  )
}
