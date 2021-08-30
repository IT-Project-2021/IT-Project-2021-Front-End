import { createTheme } from '@material-ui/core/styles'

const Theme = createTheme({
  palette: {
    primary: {
      main: '#B9D6F2',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      light: '',
      main: '#003559',
      dark: '',
    }
  },

  typography: {
    h1: {
      fontFamily: 'Reem Kufi',
      fontSize: '7rem',
    },
    h2: {
      fontFamily: 'Roboto',
      fontWeight: '500',
      fontSize: '14',
      fontStyle: 'bold',
    },
    body1: {
      fontFamily: 'Roboto',
      fontWeight: '400',
      lineHeight: '1.2',
    },
    body2: {
      fontFamily: 'Roboto',
      fontWeight: '700',
      lineHeight: '1.2',
    },
    button: {
      width: "120px",
      height: "40px"
    },
  }

  

});

export default Theme;