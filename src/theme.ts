import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: { mode: 'light' },
  shape: { borderRadius: 8 },
})

export const darkTheme = createTheme({
  palette: { mode: 'dark' },
  shape: { borderRadius: 8 },
})
