import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import useAppStore from '../store/useAppStore'
import ListInput from '../components/ListInput'
import ResultPanel from '../components/ResultPanel'
import type { OperationResult, SortOrder } from '../types'
import { sortOp } from '../operations/sort'

export default function SortPage() {
  const listA = useAppStore(s => s.listA)
  const setListA = useAppStore(s => s.setListA)
  const settings = useAppStore(s => s.settings)
  const liveMode = useAppStore(s => s.liveMode)

  const [order, setOrder] = useState<SortOrder>('az')
  const [result, setResult] = useState<OperationResult | null>(null)

  const run = useCallback(() => {
    setResult(sortOp(listA, settings, order))
  }, [listA, settings, order])

  useEffect(() => {
    if (liveMode) run()
  }, [liveMode, run])

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Sort
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Sort a list in various orders.
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Sort order
        </Typography>
        <ToggleButtonGroup
          value={order}
          exclusive
          onChange={(_, v) => v && setOrder(v)}
          size="small"
          sx={{ flexWrap: 'wrap' }}
        >
          <ToggleButton value="az">A → Z</ToggleButton>
          <ToggleButton value="za">Z → A</ToggleButton>
          <ToggleButton value="len-asc">Shortest first</ToggleButton>
          <ToggleButton value="len-desc">Longest first</ToggleButton>
          <ToggleButton value="shuffle">Shuffle</ToggleButton>
        </ToggleButtonGroup>
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
