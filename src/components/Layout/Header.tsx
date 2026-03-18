import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import GitHubIcon from '@mui/icons-material/GitHub'
import useAppStore from '../../store/useAppStore'
import SettingsDrawer from '../SettingsDrawer'
import type { ThemeMode } from '../../types'

const THEME_ICONS: Record<ThemeMode, React.ReactNode> = {
  light: <LightModeIcon />,
  dark: <DarkModeIcon />,
  system: <SettingsBrightnessIcon />,
}

const THEME_LABELS: Record<ThemeMode, string> = {
  light: 'Light mode (click for dark)',
  dark: 'Dark mode (click for system)',
  system: 'System mode (click for light)',
}

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const themeMode = useAppStore(s => s.themeMode)
  const liveMode = useAppStore(s => s.liveMode)
  const cycleTheme = useAppStore(s => s.cycleTheme)

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 1, display: { md: 'none' }, color: 'text.secondary' }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 700, letterSpacing: '-0.5px' }}
          >
            List Tools
          </Typography>

          {liveMode && (
            <Chip label="Live" color="success" size="small" sx={{ mr: 1 }} />
          )}

          <Tooltip title={THEME_LABELS[themeMode]}>
            <IconButton onClick={cycleTheme} sx={{ color: 'text.secondary' }}>
              {THEME_ICONS[themeMode]}
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton onClick={() => setSettingsOpen(true)} sx={{ color: 'text.secondary' }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="View on GitHub">
            <IconButton
              component="a"
              href="https://github.com/gray0072/list-tools"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'text.secondary' }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}
