import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#00acc1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffee58',
    },
    info: {
      main: '#fff',
      contrastText: '#00acc1',
    },
    neutral: {
      main: '#5b5b5b',
    },
  },

  typography: {
    fontFamily: 'YekanBakhRegular, Tahoma, Arial, sans-serif',
  },
})
