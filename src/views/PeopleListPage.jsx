import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Link } from "react-router-dom";

const palette = Theme.palette
const useStyles = makeStyles({
    contactDetails: {
      color: palette.tertiary.main,
    },
    contactNotes: {
      fontStyle: "italic",
      color: palette.tertiary.main,
      padding: "20px 0 40px 0"
    },
    contactNumbers: {
      padding: "0 0 20px 0",
      color: palette.tertiary.main,
      textDecoration: "underline"
    },
    editButton: {
      color: palette.secondary.main,
      backgroundColor: palette.primary.main,
      margin: "10px"
    }
});


const PeopleListPage = () => {
    const classes = useStyles()
    return (
        <ThemeProvider theme={Theme}>
        <CssBaseline />
            <AppBar position="static" color="secondary" align="left" >
            <Box ml="50px" my="20px">
                <Typography variant="h6">
                People
                </Typography>
            </Box>
            </AppBar>

            
            
            <h1>People</h1>

            <ul>
                <li>
                <Link to="/PeopleInformation" style={{ textDecoration: 'none' }}>
                    <Button>Person</Button>
                </Link>
                </li>
            </ul>

        </ThemeProvider>
    )
}

export default PeopleListPage