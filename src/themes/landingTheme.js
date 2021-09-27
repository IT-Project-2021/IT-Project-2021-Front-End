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
      fontSize: '9rem',
    },
    h2: {
      fontFamily: 'Roboto',
      fontWeight: '500',
      fontSize: '2.5rem',
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: '5rem',
      fontWeight: '500',
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: '2.5rem',
      fontWeight: '500',
    },
    body1: {
      fontFamily: 'Roboto',
      fontWeight: '400',
      lineHeight: '1.2',
      fontSize: '1.5rem',
    },
    body2: {
      fontFamily: 'Roboto',
      fontWeight: '700',
      lineHeight: '1.2',
    },
    button: {
      width: "150px",
      height: "55px",
    },
    secondaryButton: {
      fontFamily: 'Reem Kufi',
      fontWeight: '400',
      variant: "outlined",
    },
  }



});

export default Theme;