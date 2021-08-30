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
      fontSize: '5rem',
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