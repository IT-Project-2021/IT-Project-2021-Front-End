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
        background: {
            default: colours.white
        }
    },

    typography: {
        h1: {
            fontFamily: 'Reem Kufi',
            fontSize: '5rem',
            color: colours.black
        },
        h2: {
            fontFamily: 'Reem Kufi',
            fontWeight: '400',
            fontSize: '1.5rem',
            color: colours.black,
        },
        body1: {
            fontFamily: 'Roboto',
            color: colours.black

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