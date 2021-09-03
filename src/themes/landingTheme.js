import { createTheme } from '@material-ui/core/styles'
import colours from "./colours"

const Theme = createTheme({
  palette: {
    primary: {
      main: colours.beau_blue,
    },
    secondary: {
      main: colours.white,
    },
    background: {
      light: '',
      default: colours.dark_blue,
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
      fontSize: '1.5rem',
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: '1.25rem',
      fontWeight: '500',
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
      height: "40px",
    },
  }



});

export default Theme;