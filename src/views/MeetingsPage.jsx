import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import AddButton from "@material-ui/icons/Add"
import IconButton from '@material-ui/core/IconButton';
import PageAppBar from "../components/PageAppBar"
import { Link } from "react-router-dom";
import meetingService from "../services/meetings"
import React, { useState, useEffect } from 'react'

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
    listedMeeting: {
        textTransform: "none",
        padding: "22px 20px 15px 15px"
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

const MeetingListItem = ({title, date}) => {
    const classes = useStyles();
    const meetingTime = new Date(date)
    return (
        <Box>
            <Link to="/MeetingInformation" className={classes.meetingLink} >
                <Button className={classes.meetingButton} fullWidth={true}>
                    <Typography variant="h4" className={classes.listedMeeting}> {title} ({meetingTime.toString()}) </Typography>
                </Button>
            </Link>
            <Divider className={classes.divider} />
        </Box>
    )
}

const MeetingsPage = () => {

    // time the page was loaded
    const curTime = new Date()

    // maintain list of meetings from the server
    const [meetingList, setMeetingList] = useState([])
    const [futureMeetings, setFutureMeetings] = useState([])
    const [pastMeetings, setPastMeetings] = useState([])

    const isFutureMeeting = (date) => {
        let meetingTime = new Date(date)
        return (meetingTime - curTime) > 0
    }

    // retrieve the list of meetings
    useEffect(() => {
        meetingService
            .getAll()
            .then(response => {
                // get the list of all meetings
                setMeetingList(response.data)

                // filter the meeting list into past and future meetings
                setFutureMeetings(meetingList.filter(item => isFutureMeeting(item.date)));
                setPastMeetings(meetingList.filter(item => !isFutureMeeting(item.date)));

                // this log is required to make the page work. Something to do with React rendering rules????
                console.log("retrieved meetings:", meetingList)
            })
            .catch(error => {
                console.log("Failed to retrieve list of meetings from the server:", error)
            })
    }, [])

    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
        <CssBaseline />

            <PageAppBar prevPage="/HomePage" tab="Meetings"/>

            <Typography variant="h2" className={classes.leftText} >Upcoming</Typography>

            {/* List of future meetings  */}
            <Grid container direction="column" style={{ padding: "20px 0 0 0"}}>
            <ul className={classes.meetingList}>

                {futureMeetings.map(item => 
                    <li key={item._id}>
                        <MeetingListItem 
                            title={item.title}
                            date={item.date}
                        />
                    </li>
                )}
            </ul>
            </Grid>

            <Typography variant="h2" className={classes.leftText} >Past Meetings</Typography>

            {/* List of past meetings  */}
            <Grid container direction="column" style={{ padding: "20px 0 0 0"}}>
            <ul className={classes.meetingList}>

                {pastMeetings.map(item => 
                    <li key={item._id}>
                        <MeetingListItem 
                            title={item.title}
                            date={item.date}
                        />
                    </li>
                )}
            </ul>
            </Grid>

            <Box className={classes.addButtonContainer} >
              <Link to="/CreateMeeting" style={{ textDecoration: 'none' }}>
                <IconButton aria-label="add" className={classes.addButton} >
                    <AddButton fontSize="large"/>
                </IconButton>
              </Link>
            </Box>

        </ThemeProvider>
    )
}

export default MeetingsPage