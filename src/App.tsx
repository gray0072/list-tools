import { useState, useMemo } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import useAppStore from './store/useAppStore'
import { lightTheme, darkTheme } from './theme'
import Header from './components/Layout/Header'
import Sidebar, { DRAWER_WIDTH } from './components/Layout/Sidebar'
import UnionPage from './pages/UnionPage'
import IntersectionPage from './pages/IntersectionPage'
import DifferencePage from './pages/DifferencePage'
import SymmetricPage from './pages/SymmetricPage'
import DeduplicatePage from './pages/DeduplicatePage'
import CountPage from './pages/CountPage'
import SortPage from './pages/SortPage'
import FilterPage from './pages/FilterPage'

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const themeMode = useAppStore(s => s.themeMode)
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(() => {
    if (themeMode === 'dark') return darkTheme
    if (themeMode === 'light') return lightTheme
    return prefersDark ? darkTheme : lightTheme
  }, [themeMode, prefersDark])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Header onMenuClick={() => setMobileOpen(true)} />
        <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            minWidth: 0,
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Navigate to="/union" replace />} />
            <Route path="/union" element={<UnionPage />} />
            <Route path="/intersection" element={<IntersectionPage />} />
            <Route path="/difference" element={<DifferencePage />} />
            <Route path="/symmetric" element={<SymmetricPage />} />
            <Route path="/deduplicate" element={<DeduplicatePage />} />
            <Route path="/count" element={<CountPage />} />
            <Route path="/sort" element={<SortPage />} />
            <Route path="/filter" element={<FilterPage />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}
