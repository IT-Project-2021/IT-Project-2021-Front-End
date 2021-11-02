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
import Cookies from 'universal-cookie'

const palette = Theme.palette
const useStyles = makeStyles({
    meetingButton: {
      color: palette.tertiary.main,
      justifyContent: "flex-start",
      flexDirection: "column",
    },
    divider: {
        background: palette.quarternary.main,
        variant: 'fullWidth',
    },
    meetingLink: {
        textDecoration: "none",
        justifyContent: "flex-start",
        flexDirection: "column"
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

const MeetingListItem = ({title, date, id}) => {
    const classes = useStyles();


    const formatMeetingTime = (date) => {
        let meetTime = new Date(date)
        
        let day = meetTime.getDate()
        let month = meetTime.getMonth() + 1
        let year = meetTime.getFullYear().toString().slice(2)

        let hour = meetTime.getHours()

        let minutes = meetTime.getMinutes()
        // formatting for minutes
        if (minutes <= 9) {
            minutes = 0 + minutes.toString()
        }
        
        let amOrPm = "AM"
        // formatting for am or pm
        if (hour === 12) {
            // midday
            amOrPm = "PM"
        } else if (hour === 0) {
            // midnight
            hour = 12
        } else if (hour > 12) {
            // after midday
            hour -= 12
            amOrPm = "PM"
        }

        return `${day}/${month}/${year} ${hour}:${minutes} ${amOrPm}`
    }

    const getLink = () => {
        return "/MeetingInformation/" + id
    }

    return (
        <Box>
            <Link to={getLink()} className={classes.meetingLink} >
                <Button className={classes.meetingButton} fullWidth={true} >
                    <div>
                        <Typography variant="h6" className={classes.listedMeetingTime}> {formatMeetingTime(date)} </Typography>
                        <Typography variant="h4" className={classes.listedMeetingTitle}> {title} </Typography>
                    </div>
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

    // functions for determining when a meeting occurs
    // future meetings have a timeOffset > 0. timeOffsets closer to 0 should appear nearer to the top of the list.
    const getTimeOffset = (date) => {
        let meetingTime = new Date(date)
        return meetingTime - curTime
    }
    const isFutureMeeting = (date) => {
        return getTimeOffset(date) > 0
    }
    const sortFutureMeetings = (i, j) => {
        return getTimeOffset(i.date) - getTimeOffset(j.date)
    }
    const sortPastMeetings = (i, j) => {
        return getTimeOffset(j.date) - getTimeOffset(i.date)
    }

    // retrieve the list of meetings
    useEffect(() => {
        const cookies = new Cookies()
        meetingService
            .getAll(cookies.get("token"))
            .then(response => {
                // get the list of all meetings
                setMeetingList(response.data)
            })
            .catch(error => {
                // 401 error occurs if token is either missing or bad
                if (error.response && error.response.status && (error.response.status === 401)) {
                    // if there is a token but request is still unauthorised, something is wrong with the token
                    if (cookies.get("token")) {
                        cookies.remove("token") 
                    }
                    // in either case, redirect to login
                    window.location.href = "/login"
                }
            })
    }, [])

    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
        <CssBaseline />

            <PageAppBar prevPage="/HomePage" tab="Meetings" type="Menu"/>

            <Typography variant="h2" className={classes.leftText} >Upcoming</Typography>

            {/* List of future meetings  */}
            <Grid container direction="column" style={{ padding: "20px 0 0 0"}}>
            <ul className={classes.meetingList}>
                {meetingList
                    .filter(item => isFutureMeeting(item.date))
                    .sort(sortFutureMeetings)
                    .map(item => 
                    <li key={item._id}>
                        <MeetingListItem 
                            title={item.title}
                            date={item.date}
                            id={item._id}
                        />
                    </li>
                )}
            </ul>
            </Grid>

            <Typography variant="h2" className={classes.leftText} >Past Meetings</Typography>

            {/* List of past meetings  */}
            <Grid container direction="column" style={{ padding: "20px 0 0 0"}}>
            <ul className={classes.meetingList}>
                {meetingList
                    .filter(item => !isFutureMeeting(item.date))
                    .sort(sortPastMeetings)
                    .map(item => 
                    <li key={item._id}>
                        <MeetingListItem 
                            title={item.title}
                            date={item.date}
                            id={item._id}
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