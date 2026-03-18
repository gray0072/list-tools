import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import useAppStore from '../store/useAppStore'
import type { Settings } from '../types'

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const settings = useAppStore(s => s.settings)
  const liveMode = useAppStore(s => s.liveMode)
  const updateSettings = useAppStore(s => s.updateSettings)
  const setLiveMode = useAppStore(s => s.setLiveMode)

  const { control, watch, reset } = useForm<Settings>({ defaultValues: settings })

  // Re-sync form when drawer opens
  useEffect(() => {
    if (open) reset(settings)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync form changes → Zustand store
  useEffect(() => {
    const sub = watch(values => updateSettings(values as Settings))
    return () => sub.unsubscribe()
  }, [watch, updateSettings])

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Live Mode
        </Typography>
        <FormControlLabel
          control={
            <Switch checked={liveMode} onChange={e => setLiveMode(e.target.checked)} />
          }
          label="Update result as you type"
          sx={{ mb: 2 }}
        />

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Comparison
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Controller
            name="ignoreCase"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} onChange={field.onChange} />}
                label='Ignore case ("Apple" = "apple")'
              />
            )}
          />
          <Controller
            name="trimWhitespace"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} onChange={field.onChange} />}
                label='Trim whitespace (" foo " = "foo")'
              />
            )}
          />
          <Controller
            name="ignoreEmpty"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} onChange={field.onChange} />}
                label="Ignore empty lines"
              />
            )}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Separator
        </Typography>
        <Controller
          name="separator"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth size="small">
              <InputLabel>Separator</InputLabel>
              <Select {...field} label="Separator">
                <MenuItem value="auto">Auto-detect</MenuItem>
                <MenuItem value="newline">Newline only</MenuItem>
                <MenuItem value="comma">Comma (,)</MenuItem>
                <MenuItem value="semicolon">Semicolon (;)</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Box>
    </Drawer>
  )
}
