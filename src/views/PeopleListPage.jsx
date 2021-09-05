import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AddButton from "@material-ui/icons/Add"
import IconButton from '@material-ui/core/IconButton';

//general components in use
import PageAppBar from "../components/PageAppBar"

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
    addButtonContainer: {
        position: "fixed", 
        bottom: 0,
        padding: "4em",
        width: "100%",
        justifyContent: "flex-end",
        display: "flex"
    },
    addButton: {
        fontSize: "large",
        color: palette.tertiary.main,
        backgroundColor: palette.quarternary.main
    }
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
        <Grid container direction="column" style={{ minHeight: "80vh", padding: "20px 0 0 0"}}>
        <ul className={classes.personList}>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
            <li><PersonListItem /></li>
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
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
        <CssBaseline />

            <PageAppBar prevPage="/HomePage"/>

            <PersonList />

            <Box className={classes.addButtonContainer} >
                <IconButton aria-label="add" className={classes.addButton} >
                    <AddButton fontSize="large"/>
                </IconButton>
            </Box>

        </ThemeProvider>
    )
}

export default PeopleListPage