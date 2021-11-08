import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar";
import meetingService from "../services/meetings"
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
// import AddButton from "@material-ui/icons/Add"
// import IconButton from '@material-ui/core/IconButton';
// import { Link } from "react-router-dom";

const palette = Theme.palette
const useStyles = makeStyles({
    meetingButton: {
      color: palette.tertiary.main,
      justifyContent: "flex-start",
      minWidth: "80vw"
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
        margin: "0px 5vw"
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
    deleteButton: {
      fontSize: "medium",
      margin: "0vh 1vh",
      color: palette.alert.main,
    },
    buttonsContainer: {
      margin: "2vh 0vh 0vh",        
    },
});

const DeleteButton = () => {
    const classes = useStyles();  
    return (
      <Box className={classes.deleteButton}>
        <Button size="medium" type="submit" variant="outlined" style={{ color: '#FF7F7F', border: '2px solid' }} >
          <Typography variant="alert">Delete</Typography>
        </Button>
      </Box>
    )
  }

const MeetingListItem = ({meeting}) => {

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

    // determine when the reminder is
    const getAlertSetting = () => {
        if (meeting && meeting.alerts && meeting.alerts[0] && meeting.alerts[0].alertSetting) {
            let setting = meeting.alerts[0].alertSetting
            switch (setting) {
            case "":
                return "None"
            case "300000":
                return "5 minutes before"
            case "900000":
                return "15 minutes before"
            case "1800000":
                return "30 minutes before"
            case "3600000":
                return "1 hour before"
            case "7200000":
                return "2 hours before"
            case "86400000":
                return "1 day before"
            default:
                return "None"
            }
        } else return ""
    } 

    const redirectToInfo = () => {
        window.location.href = "/MeetingInformation/" + meeting._id
    }

    const classes = useStyles();
    return (
        <Box>
            <Grid container>

                <Grid>
                    <Button className={classes.meetingButton} fullWidth={true} onClick={redirectToInfo}>                
                        
                        <Typography variant="h6" className={classes.listedMeetingTime}> {formatMeetingTime(meeting.date)} <br></br> Reminder {getAlertSetting()} </Typography>
                        <Typography variant="h4" className={classes.listedMeetingTitle}> {meeting.title} </Typography>
                    
                    </Button>
                </Grid>

                <Box className={classes.buttonsContainer}>
                    <DeleteButton fontSize="large" className={classes.deleteButton}/>
                </Box>
            
                
                <Divider className={classes.divider} />
            </Grid>
        </Box>
    )
}

const MeetingList = ({meetings}) => {

    // functions for placing soonest meetings first & filtering
    const getTimeOffset = (date) => {
        let meetingTime = new Date(date)
        let curTime = new Date()
        return meetingTime - curTime
    }
    const sortFutureMeetings = (i, j) => {
        return getTimeOffset(i.date) - getTimeOffset(j.date)
    }
    const isFutureMeeting = (date) => {
        return getTimeOffset(date) > 0
    }

    const classes = useStyles();
    return (
        <Grid container direction="column" style={{ padding: "20px 0 0 0"}}>
        <ul className={classes.meetingList}>
            {meetings
                .filter(item => isFutureMeeting(item.date) && item.alerts.length !== 0)
                .sort(sortFutureMeetings)
                .map(item => 
                <li><MeetingListItem meeting={item}/></li>
            )}

        </ul>
        </Grid>
    )
}

const RemindersPage = () => {
    // maintain list of meetings from the server
    const [meetingList, setMeetingList] = useState([])

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
                console.log("Failed to retrieve list of meetings from the server:", error)
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

    return (
        <ThemeProvider theme={Theme}>
        <CssBaseline />

            <PageAppBar tab="Reminders" type="Menu"/>

            <MeetingList meetings={meetingList}/>

        </ThemeProvider>
    )
}

export default RemindersPage