import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import useAppStore from '../store/useAppStore'
import ListInput from '../components/ListInput'
import type { CountResult } from '../types'
import { countOp } from '../operations/count'

export default function CountPage() {
  const listA = useAppStore(s => s.listA)
  const setListA = useAppStore(s => s.setListA)
  const settings = useAppStore(s => s.settings)
  const liveMode = useAppStore(s => s.liveMode)

  const [result, setResult] = useState<CountResult | null>(null)

  const run = useCallback(() => {
    setResult(countOp(listA, settings))
  }, [listA, settings])

  useEffect(() => {
    if (liveMode) run()
  }, [liveMode, run])

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Count Occurrences
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        See how many times each value appears in the list, sorted by frequency.
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

      {result && result.entries.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }} />

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

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.75,
              maxHeight: 480,
              overflowY: 'auto',
              pr: 1,
            }}
          >
            {result.entries.map(({ value, count }) => (
              <Box key={value} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    minWidth: 180,
                    maxWidth: 240,
                    fontFamily: 'monospace',
                    fontSize: 13,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={value}
                >
                  {value}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={result.maxCount > 0 ? (count / result.maxCount) * 100 : 0}
                    sx={{ height: 10, borderRadius: 1 }}
                  />
                </Box>
                <Chip label={count} size="small" sx={{ minWidth: 40 }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
