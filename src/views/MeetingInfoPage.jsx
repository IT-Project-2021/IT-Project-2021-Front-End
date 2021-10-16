import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import { Link, useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import meetingService from '../services/meetings'
import peopleService from "../services/people"
import MeetingsPage from "./MeetingsPage";

const palette = Theme.palette
const useStyles = makeStyles({
    contactDetails: {
      color: palette.tertiary.main,
    },
    meetingDescription: {
      padding: "3vh 3vh 0vh",
      textAlign: "left",
    },
    meetingDetails: {
      textAlign: "left",
      padding: "3vh 2vh 0vh"
    },
    editButtonContainer: {
      position: "fixed", 
      bottom: "0vh",
      width: "95%",
      justifyContent: "flex-end",
      display: "flex",
      padding: "4vh",        
    },
    editButton: {
      fontSize: "medium",
      color: palette.tertiary.main,
      backgroundColor: palette.quarternary.main
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    meetingQuestions: {
      textAlign: "left",
      padding: "3vh 1vh 0vh",
    },
    meetingAnswers: {
      padding: "3vh 1vh 0vh",
      textAlign: "left",
    },
    bold: {
      fontWeight: 600
    },
    listItems: {
      padding: "1vh 3vh 0vh",
      textAlign: "left",
    },
});

const MeetingDetails = ({meeting}) => {

  const classes = useStyles();
  return (
    <Box >
      <Box className={classes.meetingDetails}>
        <Typography variant="h1">{meeting.title}</Typography>
      </Box>

      <Box className={classes.meetingDescription}>
        <Typography variant="body1">
            {meeting.details}
        </Typography>
      </Box>
    </Box>
  )
}

const EditDetailsButton = () => {
  const classes = useStyles();
  return (
    <Button className={classes.editButton} variant="contained" type="submit" >
      <Typography variant="button">Edit Details</Typography>
    </Button>
  )
}

const MeetingQuestions = () => {
  
  const classes = useStyles();
  return (
      
    <Box > 
      <Box className={classes.meetingQuestions}>
        <Typography variant="h3" className={classes.bold}>
          Date/Time: 
        </Typography>
      </Box>
      
      <Box className={classes.meetingQuestions}>
        <Typography variant="h3" className={classes.bold}>
          Location:
        </Typography>
      </Box>
      
      <Box className={classes.meetingQuestions}>
        <Typography variant="h3" className={classes.bold}>
          Reminder:
        </Typography>
      </Box>

      
    </Box>
  )
};

const MeetingAnswers = ({meeting}) => {
  const [reminder] = React.useState('');

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

  const getAlertTime = () => {
    // console.log("Meeting:", meeting)
    // console.log("alerts:", meeting.alerts)
    // console.log("0th alert:", meeting.alerts[0])
    // console.log("Alert setting:", meeting.alerts[0].alertSetting)
    if (meeting && meeting.alerts && meeting.alerts[0] && meeting.alerts[0].alertSetting) {
      return meeting.alerts[0].alertSetting
    } else return ""
  } 

  const getLocation = () => {
    if (meeting.location === "") {
      return "[None Specified]"
    } else return meeting.location
  }

  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.meetingAnswers}>
        <Typography variant="h3">
          {formatMeetingTime(meeting.date)}
        </Typography>
      </Box>
      

      <Box className={classes.meetingAnswers}>
        <Typography variant="h3">
          {getLocation()}
        </Typography>
      </Box>

      <Box className={classes.meetingAnswers}>
        <FormControl>
          <Select 
            label="Reminder" 
            id="select" 
            labelId="open-select-label" 
            value={getAlertTime()}
            displayEmpty
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={300000}>5 minutes before</MenuItem> 
            <MenuItem value={900000}>15 minutes before</MenuItem>
            <MenuItem value={1800000}>30 minutes before</MenuItem>
            <MenuItem value={3600000}>1 hour before</MenuItem>
            <MenuItem value={7200000}>2 hours before</MenuItem>
            <MenuItem value={86400000}>1 day before</MenuItem>
          </Select>
        </FormControl>          
      </Box>
    </Box>
  )
}

const ParticipantsAndTopics = ({meeting, people}) => {

  // extract contact name
  const getName = (participant) => {
    return participant.first_name + " " + participant.last_name
  }

  // get the list of participants (including names, not just ID codes)
  const getParticipantList = () => {

    let participantObjects = []

    // skip if the meeting information isn't loaded yet
    if (!meeting || !meeting.participants) {
      console.log("there was no meeting object")
      return participantObjects
    } else if (!people) {
      console.log("there was no people object")
      return participantObjects
    } else {
      // extract participant names from previous database call
      // if a participant code cannot be resolved (e.g. because the entry was deleted from the database), omit it
      for (let i=0; i<meeting.participants.length; i++) {
        let nextItem = people.find((person) => person._id === meeting.participants[i])
        if (nextItem) {
          participantObjects.push(nextItem)
        }
      }

      return participantObjects
    }

    
  }

  const getAgenda = () => {
    if (!meeting || !meeting.agenda) {
      return []
    } else return meeting.agenda
  }

  const classes = useStyles();
  return (
    
    <Box>
      <Box className={classes.meetingQuestions}> 
        <Typography variant="h3" className={classes.bold}>
          Participants
        </Typography>
      </Box>
      
      {getParticipantList().map(item => (
        <Typography variant="h3" className={classes.listItems}>
          {item.first_name + " " + item.last_name}
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
      ))}

      {/* TODO make this searchable (as in create meeting) */}
      <Box>
        <Box>
          <TextField className={classes.listItems}
            hiddenLabel
            id="participants"
            placeholder="+ add participant"
          />
        </Box>
      </Box>

      <Box className={classes.meetingQuestions}>
        <Typography variant="h3" className={classes.bold}>
          Agenda
        </Typography>
      </Box>



      <Box>
        {getAgenda().map(item => (
          <Typography variant="h3" className={classes.listItems}>
            {item}
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Typography>
        ))}
        
        <Box>
          <TextField className={classes.listItems}
            hiddenLabel
            id="participants"
            placeholder="+ add topic"
          />
        </Box>
      </Box>

      < br/>

    </Box>
  )
}

const MeetingInfoPage = () => {

  // retrieve meeting information from database
  let {id} = useParams();
  const [meetingInfo, setMeetingInfo] = useState({})
  useEffect(() => {
    meetingService
      .getByID(id)
      .then(response => setMeetingInfo(response.data))
      .catch(error => console.log("Failed to retrieve meeting information from the server"))
  }, [id])

  console.log("Meeting information:", meetingInfo)

  // Make database request to resolve participant names
  const [allPeople, setAllPeople] = useState([])
  useEffect(() => {
    peopleService
      .getAll()
      .then(response => {
        setAllPeople(response.data)
      })
      .catch(error => {
        console.log("Failed to retrieve people list from the server")
      })
  }, [])
  console.log("All people:", allPeople)

  const classes = useStyles();

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar prevPage="/Meetings" tab="Meetings" type="Back"/>

        <Grid container direction="column" justifyContent="center" style={{ minHeight: "70vh" }}>
          
          <MeetingDetails meeting={meetingInfo}/>

          <div className={classes.row}>
            <div className={classes.meetingQuestions}>
              <MeetingQuestions />
            </div>
            <div className={classes.meetingAnswers}>
              <MeetingAnswers meeting={meetingInfo}/>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.meetingQuestions}>
              <ParticipantsAndTopics meeting={meetingInfo} people={allPeople}/>
            </div>
          </div>

          <Box className={classes.editButtonContainer} >
            <EditDetailsButton fontSize="large" className={classes.editButton}/>
          </Box>


        </Grid>

    </ThemeProvider>
)};

export default MeetingInfoPage;
