import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import useAppStore from '../store/useAppStore'
import ListInput from '../components/ListInput'
import type { OperationResult } from '../types'
import { symmetricOp } from '../operations/symmetric'

export default function SymmetricPage() {
  const listA = useAppStore(s => s.listA)
  const listB = useAppStore(s => s.listB)
  const setListA = useAppStore(s => s.setListA)
  const setListB = useAppStore(s => s.setListB)
  const swapLists = useAppStore(s => s.swapLists)
  const settings = useAppStore(s => s.settings)
  const liveMode = useAppStore(s => s.liveMode)

  const [result, setResult] = useState<OperationResult | null>(null)
  const [copiedA, setCopiedA] = useState(false)
  const [copiedB, setCopiedB] = useState(false)

  const run = useCallback(() => {
    setResult(symmetricOp(listA, listB, settings))
  }, [listA, listB, settings])

  useEffect(() => {
    if (liveMode) run()
  }, [liveMode, run])

  const copySection = async (items: string[], setCopied: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(items.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const onlyInA = result?.onlyInA ?? []
  const onlyInB = result?.onlyInB ?? []

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Symmetric Difference
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Values that exist in only one of the two lists — not in both.
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

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 600 }}>
                  Only in A ({onlyInA.length})
                </Typography>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copySection(onlyInA, setCopiedA)}
                  disabled={onlyInA.length === 0}
                >
                  {copiedA ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
              <TextField
                multiline
                fullWidth
                value={onlyInA.join('\n')}
                minRows={8}
                maxRows={15}
                inputProps={{ readOnly: true, style: { fontFamily: 'monospace', fontSize: 13 } }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                <Typography variant="subtitle2" color="warning.main" sx={{ fontWeight: 600 }}>
                  Only in B ({onlyInB.length})
                </Typography>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copySection(onlyInB, setCopiedB)}
                  disabled={onlyInB.length === 0}
                >
                  {copiedB ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
              <TextField
                multiline
                fullWidth
                value={onlyInB.join('\n')}
                minRows={8}
                maxRows={15}
                inputProps={{ readOnly: true, style: { fontFamily: 'monospace', fontSize: 13 } }}
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}
