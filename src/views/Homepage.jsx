import Theme from "../themes/landingTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

// determine the styles on this page
const palette = Theme.palette
const useStyles = makeStyles({
    mainButton: {
        height: "98%",
        justifyContent: "flex-start",
        color: palette.secondary.main,
        padding: "30px 0 0 0",
    },
    divider: {
        background: palette.secondary.main
    }
});

// the main buttons on the homepage (e.g. People, Meetings)
const HomePageButton = ({name}) => {
    const classes = useStyles();
    return (
        <Box marginLeft="1%">
            <Button className={classes.mainButton} fullWidth={true}>
                <Typography variant="h2">{name}</Typography>
            </Button>
            <Divider className={classes.divider} />
        </Box>
    )
}

const OptionsButton = ({name, position}) => {

    // interpret position of the text
    let justifyFlex = "flex-start"
    if (position === "right") {
        justifyFlex = "flex-end"
    }

    return (
        <Button size="large" style={{ height: "100%", justifyContent: justifyFlex, width: "50%" }}>
            <Typography variant="h6" style={{ color: "white" }}>{name}</Typography>
        </Button>
    )
}

const HomePage = () => {

    // const classes = useStyles();

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <Box mt="100px" mb="50px">
                <Typography variant="h1" align="center" color="primary">
                    My Daily
                </Typography>
                <Typography variant="h1" align="center" color="primary">
                    Planner
                </Typography>
            </Box>

            <HomePageButton name="People" />
            <HomePageButton name="Meetings" />
            <HomePageButton name="Reminders" />

            <Box mt="2px" width={.99} bgcolor="primary" height="60px" position="absolute" bottom="0">
                <OptionsButton name="Settings" position="left" />
                <OptionsButton name="Logout" position="right" />
            </Box>

        </ThemeProvider>
    )
};


export default HomePage