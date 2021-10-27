import { createTheme, responsiveFontSizes  } from '@material-ui/core/styles'
import colours from "./colours"


let Theme = createTheme({
    palette: {
        primary: {
            main: colours.white,
        },
        secondary: {
            main: colours.dark_blue,
        },
        tertiary: {
            main: colours.black,
        },
        quarternary: {
            main: colours.beau_blue,
        },
        background: {
            default: colours.white,
        },
        alert: {
            main: colours.light_red,
        }        
    },

    typography: {
        h1: {
            fontFamily: 'Reem Kufi',
            fontSize: '6rem',
            color: colours.black
        },
        h2: {
            fontFamily: 'Reem Kufi',
            fontWeight: '350',
            fontSize: '4rem',
            color: colours.black,
        },
        body1: {
            fontFamily: 'Roboto',
            color: colours.black,
            fontSize: '1.5rem',

        },
        button: {
            fontFamily: 'Reem Kufi',
            fontWeight: '350',
            fontSize: '1rem',
            color: colours.dark_blue,
        },
        alert: {
            fontFamily: 'Reem Kufi',
            fontWeight: '350',
            fontSize: '1rem',
            color: colours.alert,
        }
    }
});

Theme = responsiveFontSizes(Theme);

export default Theme;