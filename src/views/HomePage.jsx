import Theme from "../themes/landingTheme";
import PageTitle from "../components/PageTitle"
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from "react-router-dom";

const palette = Theme.palette
const useStyles = makeStyles({
    mainButton: {
        height: "90%",
        justifyContent: "flex-start",
        color: palette.secondary.main,
        padding: "10px 0 10px 2px",
        marginTop: "2px",
    },
    divider: {
        background: palette.secondary.main,
        variant: 'fullWidth',
    },
    optionsButton: {
        width: "50%",
        height: "100%",
        color: palette.secondary.main,
        padding: "0 15px 0 15px"
    },
    optionsBar: {
        width: "99%",
        height: "60px",
        bottom: "0px",
        position: "fixed",
    }
});


// the main buttons on the homepage (e.g. People, Meetings)
const HomePageButton = ({ name, linkedComponent }) => {
    const classes = useStyles();
    return (
        <Box marginLeft="1%">
            <Button className={classes.mainButton} fullWidth={true} component={linkedComponent}>
                <Typography variant="h2">{name}</Typography>
            </Button>
            <Divider className={classes.divider} />
        </Box>
    )
}

// buttons to navigate to various site options (e.g. Settings, Logout)
const OptionsButton = ({ name, position }) => {
    // interpret position of the text
    let justifyFlex = "flex-start"
    if (position === "right") {
        justifyFlex = "flex-end"
    }

    const classes = useStyles();
    return (
        <Button className={classes.optionsButton} style={{ justifyContent: justifyFlex }}>
            <Typography variant="h5">{name}</Typography>
        </Button>
    )
}

// bar at the bottom of the page, providing site options
const OptionsBar = () => {

    const classes = useStyles();
    return (
        <Box className={classes.optionsBar}  >
            
            <Link to="/Profile" style={{ textDecoration: 'none' }}>
                <OptionsButton name="Profle" position="left" />
            </Link>

            <Link to="/" style={{ textDecoration: 'none' }}>
                <OptionsButton name="Logout" position="right" />
            </Link>

        </Box>
    )
}

const HomePage = () => {
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <Grid container direction="column" justifyContent="center" style={{ minHeight: "90vh" }}>

                <PageTitle />
                <Link to="/Meetings" style={{ textDecoration: 'none' }}>
                    <HomePageButton name="Meetings"/>
                </Link>
                <HomePageButton name="Reminders" />
                <Link to="/People" style={{ textDecoration: 'none' }}>
                    <HomePageButton name="People" />
                </Link>

                <Link to="/Meetings" style={{ textDecoration: 'none' }}>
                    <HomePageButton name="Meetings" />
                </Link>

                <HomePageButton name="Reminders" />

                <OptionsBar />

            </Grid>
        </ThemeProvider>
    )
};

export default HomePage

