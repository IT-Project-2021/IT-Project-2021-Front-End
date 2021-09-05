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
    personButton: {
      color: palette.tertiary.main,
      justifyContent: "flex-start",
    },
    divider: {
        background: palette.secondary.main,
        variant: 'fullWidth',
    },
    personLink: {
        textDecoration: "none",
    },
    listedPerson: {
        textTransform: "none",
        padding: "10px 20px 10px 10px"
    },
    personList: {
        listStyleType: "none",
        padding: "0 10px 0 10px"
    },
});

const PersonListItem = () => {
    const classes = useStyles();
    return (
        <Box>
            <Link to="/PeopleInformation" className={classes.personLink} >
                <Button className={classes.personButton} fullWidth={true}>
                    <Typography className={classes.listedPerson}> Person </Typography>
                </Button>
            </Link>
            <Divider className={classes.divider} />
        </Box>
    )
}

const PersonList = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column" style={{ minHeight: "90vh", padding: "20px 0 0 0"}}>
        <ul className={classes.personList}>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
        </ul>
        </Grid>
    )
}

const PeopleListPage = () => {
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

            <PersonList />

        </ThemeProvider>
    )
}

export default PeopleListPage