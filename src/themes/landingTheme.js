import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'
import colours from "./colours"

let Theme = createTheme({
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
      fontSize: '8rem',
    },
    h2: {
      fontFamily: 'Roboto',
      fontWeight: '450',
      fontSize: '2rem',
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: '4rem',
      fontWeight: '450',
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: '1.5rem',
      fontWeight: '500',
    },
    body1: {
      fontFamily: 'Roboto',
      fontWeight: '350',
      lineHeight: '1',
      fontSize: '1rem',
    },
    body2: {
      fontFamily: 'Roboto',
      fontWeight: '650',
      lineHeight: '1.2',
    },
    button: {
      width: "140px",
      height: "45px",
    },
    secondaryButton: {
      fontFamily: 'Reem Kufi',
      fontWeight: '400',
      variant: "outlined",
    },
  }
});


Theme = responsiveFontSizes(Theme);

export default Theme;