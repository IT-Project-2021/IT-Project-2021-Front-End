import { createTheme } from '@material-ui/core/styles'
import colours from "./colours"

const Theme = createTheme({
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
            default: colours.white
        }
    },

    typography: {
        h1: {
            fontFamily: 'Reem Kufi',
            fontSize: '7rem',
            color: colours.black
        },
        h2: {
            fontFamily: 'Reem Kufi',
            fontWeight: '400',
            fontSize: '2.5rem',
            color: colours.black,
        },
        body1: {
            fontFamily: 'Roboto',
            color: colours.black,
            fontSize: '1.5rem',

        },
        button: {
            fontFamily: 'Reem Kufi',
            fontWeight: '400',
            fontSize: '1.5rem',
            color: colours.dark_blue
        },

    }
});

export default Theme;