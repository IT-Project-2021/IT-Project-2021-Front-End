import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import AddButton from "@material-ui/icons/Add"
import IconButton from '@material-ui/core/IconButton';
import PageAppBar from "../components/PageAppBar";
import { Link } from "react-router-dom";

const palette = Theme.palette
const useStyles = makeStyles({
    meetingButton: {
      color: palette.tertiary.main,
      justifyContent: "flex-start",
    },
    divider: {
        background: palette.quarternary.main,
        variant: 'fullWidth',
    },
    meetingLink: {
        textDecoration: "none",
    },
    listedMeetingTitle: {
        textTransform: "none",
        padding: "22px 20px 25px 15px",
    },
    listedMeetingTime: {
        textTransform: "none",
        padding: "2px 10px 0",
        textAlign: "left",
    },
    meetingList: {
        listStyleType: "none",
        padding: "0 10px 0 15px"
    },
    addButtonContainer: {
        position: "fixed", 
        bottom: 0,
        width: "100%",
        justifyContent: "flex-end",
        display: "flex",
        padding: "4em",
    },
    addButton: {
        fontSize: "large",
        color: palette.tertiary.main,
        backgroundColor: palette.quarternary.main
    },
    leftText: {
        textAlign: "left",
        padding: "30px 00px 0px 33px"
    },
});

const MeetingListItem = () => {
    const classes = useStyles();
    return (
        <Box>
            
            <Button className={classes.meetingButton} fullWidth={true}>
                <Grid container justify="space-between">  
                    <div>
                        <Typography variant="h6" className={classes.listedMeetingTime}> 10/10/21 3:00 PM </Typography>
                        <Typography variant="h4" className={classes.listedMeetingTitle}> Meeting name </Typography>
                    </div>
                </Grid>
            </Button>
            
            <Divider className={classes.divider} />
        </Box>
    )
}

const MeetingList = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column" style={{ padding: "20px 0 0 0"}}>
        <ul className={classes.meetingList}>
            <li><MeetingListItem /></li>
            <li><MeetingListItem /></li>
            <li><MeetingListItem /></li>
            <li><MeetingListItem /></li>
        </ul>
        </Grid>
    )
}

const RemindersPage = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
        <CssBaseline />

            <PageAppBar prevPage="/HomePage" tab="Reminders" type="Menu"/>

            <MeetingList />

        </ThemeProvider>
    )
}

export default RemindersPage