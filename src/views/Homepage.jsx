import Theme from "../themes/landingTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

// determine the styles on this page
const palette = Theme.palette
const useStyles = makeStyles({
    titleText: {
        color: palette.primary.main,
        align: "center"
    },
    mainButton: {
        height: "98%",
        justifyContent: "flex-start",
        color: palette.secondary.main,
        padding: "30px 0 0 0",
    },
    divider: {
        background: palette.secondary.main
    },
    optionsButton: {
        width: "50%",
        height: "100%",
        color: palette.secondary.main,
    },
    optionsBar: {
        width: "99%",
        position: "absolute",
        height: "60px",
        bottom: "0",
    }
});

// title of the page
const PageTitle = () => {
    const classes = useStyles();
    return (
        <Box className={classes.titleText} mt="100px" mb="50px">
            <Typography variant="h1">
                My Daily <br /> Planner
            </Typography>
            
        </Box>
    )
}

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

// buttons to navigate to various site options (e.g. Settings, Logout)
const OptionsButton = ({name, position}) => {
    // interpret position of the text
    let justifyFlex = "flex-start"
    if (position === "right") {
        justifyFlex = "flex-end"
    }

    const classes = useStyles();
    return (
        <Button className={classes.optionsButton} style={{justifyContent: justifyFlex}}>
            <Typography variant="h3">{name}</Typography>
        </Button>
    )
}

// bar at the bottom of the page, providing site options
const OptionsBar = () => {

    const classes = useStyles();
    return (
        <Box className={classes.optionsBar}  >
            <OptionsButton name="Settings" position="left" />
            <OptionsButton name="Logout" position="right" />
        </Box>
    )
}

const HomePage = () => {

// import { Link } from "react-router-dom";

// const PeopleInfoPage = props => <Link to="/PeopleInformation" {...props}/>


const HomePage = () => {
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageTitle />

            <HomePageButton name="People" />
            <HomePageButton name="Meetings" />
            <HomePageButton name="Reminders" />

            <OptionsBar />


//             <Grid container direction="column" alignItems="center" justifyContent="center" style={{minHeight: "90vh"}}>
//                 <Box>
//                     <Typography variant="h1" align="center" color="primary">
//                         My Daily
//                     </Typography>
//                     <Typography variant="h1" align="center" color="primary">
//                         Planner
//                     </Typography>
//                 </Box>

//                 <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
//                     <Button fullWidth={true} size="large" style={{ height: "98%", justifyContent: "flex-start" }} component={PeopleInfoPage}>
//                         <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>People</Typography>
//                     </Button>
//                     <Divider style={{ background: "white" }} />
//                 </Box>

//                 <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
//                     <Button fullWidth={true} size="large" style={{ height: "98%", justifyContent: "flex-start" }}>
//                         <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>Meetings</Typography>
//                     </Button>
//                     <Divider style={{ background: "white" }} />
//                 </Box>

//                 <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
//                     <Button fullWidth={true} size="large" style={{ height: "98%", justifyContent: "flex-start" }}>
//                         <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>Reminders</Typography>
//                     </Button>
//                     <Divider style={{ background: "white" }} />
//                 </Box>

//                 <Box mt="2px" width={.99} bgcolor="primary" height="60px" position="fixed" bottom="0">
//                     <Button size="large" style={{ height: "100%", justifyContent: "flex-start", width: "50%" }}>
//                         <Typography variant="h6" style={{ color: "white" }}>Settings</Typography>
//                     </Button>
//                     <Button size="large" style={{ height: "100%", justifyContent: "flex-end", width: "50%" }}>
//                         <Typography variant="h6" style={{ color: "white" }}>Logout</Typography>
//                     </Button>
//                 </Box>
//             </Grid>
        </ThemeProvider>
    )
};


export default HomePage