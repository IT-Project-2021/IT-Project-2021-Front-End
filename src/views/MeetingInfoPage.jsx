import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar"
import { Link, useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import meetingService from '../services/meetings'
import peopleService from "../services/people"
import Cookies from 'universal-cookie'

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
  buttonsContainer: {
    position: "fixed",
    bottom: "0vh",
    width: "98%",
    justifyContent: "flex-end",
    display: "flex",
    padding: "4vh",
  },
  editButton: {
    fontSize: "medium",
    color: palette.tertiary.main,
    backgroundColor: palette.quarternary.main
  },
  deleteButton: {
    fontSize: "medium",
    margin: "0vh 1vh",
    color: palette.alert.main,
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
  participantLink: {
    color: palette.tertiary.main,
  },
  participantList: {
    listStyleType: "none"
  }
});

const MeetingDetails = ({ meeting }) => {

  const classes = useStyles();
  return (
    <Box >
      <Box className={classes.meetingDetails}>
        <Typography variant="h1">{meeting.title}</Typography>
      </Box>

      <Box className={classes.meetingDescription}>
        <Typography variant="h4">
          {meeting.details}
        </Typography>
      </Box>
    </Box>
  )
}

const EditDetailsButton = ({meetingInfo}) => {
  const redirect = () => {
    let id = meetingInfo._id
    if (id) {
      window.location.href = "/Meeting/edit/" + id
    }
  }
  const classes = useStyles();
  return (
    <Button className={classes.editButton} variant="contained" type="submit" onClick={redirect}>
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

const MeetingAnswers = ({ meeting }) => {

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

  const getMeetingTime = () => {
    if (!meeting || !meeting.date || meeting.date === "") {
      return ""
    } else return formatMeetingTime(meeting.date)
  }

  const getAlertTime = () => {
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
    } else return "None"
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
          {getMeetingTime()}
        </Typography>
      </Box>


      <Box className={classes.meetingAnswers}>
        <Typography variant="h3">
          {getLocation()}
        </Typography>
      </Box>

      <Box className={classes.meetingAnswers}>
        <Typography variant="h3">
          {getAlertTime()}
        </Typography>
      </Box>
    </Box>
  )
}

const ParticipantsAndTopics = ({ meeting, people }) => {

  // get the list of participants (including names, not just ID codes)
  const getParticipantList = () => {

    let participantObjects = []

    // skip if the meeting information isn't loaded yet
    if (!meeting || !meeting.participants) {
      return participantObjects
    } else if (!people) {
      return participantObjects
    } else {
      // extract participant names from previous database call
      // if a participant code cannot be resolved (e.g. because the entry was deleted from the database), omit it
      for (let i = 0; i < meeting.participants.length; i++) {
        let nextItem = people.find((person) => person._id === meeting.participants[i])
        if (nextItem) {
          participantObjects.push(nextItem)
        }
      }

      return participantObjects
    }


  }

  const formatParticipantList = () => {
    let participants = getParticipantList()
    // if there are no participants, display [none specified]
    if (participants.length === 0) {
      return (
        <ul>
          <li className={classes.participantList} key="no-participants">
            <Typography variant="h4" className={classes.listItems}>
              [None Specified]
            </Typography>
          </li>
        </ul>
      )
    } else return (
      <ul>
        {participants.map(item => (
          <li className={classes.participantList} key={item._id}>
          <Link to={"/PeopleInformation/" + item._id} className={classes.participantLink}>
            <Typography variant="h4" className={classes.listItems}>
              {item.first_name + " " + item.last_name}
            </Typography>
          </Link>
          </li>
        ))}
      </ul>
    )
  }

  const formatAgenda = () => {
    if (!meeting || !meeting.agenda || meeting.agenda.length === 0) {
      return (
        <ul>
          <li className={classes.participantList} key="no-agenda">
            <Typography variant="h4" className={classes.listItems}>
              [None Specified]
            </Typography>
          </li>
        </ul>
      )
    } else return (
      <ul>
        {meeting.agenda.map(item => (
          <li className={classes.participantList} key={item}>
          <Typography variant="h4" className={classes.listItems}>
            {item}
          </Typography>
          </li>
        ))}
      </ul>
    )
  }

  const classes = useStyles();
  return (

    <Box>
      <Box className={classes.meetingQuestions}>
        <Typography variant="h3" className={classes.bold}>
          Participants
        </Typography>
      </Box>

      {formatParticipantList()}


      <Box className={classes.meetingQuestions}>
        <Typography variant="h3" className={classes.bold}>
          Agenda
        </Typography>
      </Box>

      <Box>
        {formatAgenda()}
      </Box>

      < br />

    </Box>
  )
}

const MeetingInfoPage = () => {

  // retrieve meeting information from database
  let { id } = useParams();
  const [meetingInfo, setMeetingInfo] = useState({})
  useEffect(() => {
    const cookies = new Cookies()
    meetingService
      .getByID(id, cookies.get("token"))
      .then(response => setMeetingInfo(response.data))
      .catch(error => {

        // 401 error occurs if token is either missing or bad
        if (error.response && error.response.status && (error.response.status === 401)) {
          if (error.response.data.message === "ID Mismatch") {
            // the user is trying to access a meeting not belonging to them
            window.location.href = "/meetings"
          } else if (cookies.get("token")) {
            // The token is invalid
            cookies.remove("token", { path: '/' }) 
            window.location.href = "/login"
          } else {
            // there is no token set
            window.location.href = "/login"
          }
        }
    })
  }, [id])

  // Make database request to resolve participant names
  const [allPeople, setAllPeople] = useState([])
  useEffect(() => {
    const cookies = new Cookies()
    peopleService
      .getAll(cookies.get("token"))
      .then(response => {
        setAllPeople(response.data)
      })
      .catch(error => {
        console.log("Failed to retrieve people list from the server")
      })
  }, [])

  const DeleteButton = () => {
    const classes = useStyles();

    return (
      <Box className={classes.deleteButton}>
        <Button onClick={deleteMeeting} size="medium" type="submit" variant="outlined" style={{ color: '#FF7F7F', border: '2px solid' }} >
          <Typography variant="alert">Delete</Typography>
        </Button>
      </Box>
    )
  }


  const deleteMeeting = () => {
    const cookies = new Cookies()
    meetingService
      .remove(id, meetingInfo, cookies.get("token"))
      .then(response => {
        window.location.href = "/Meetings"
      })
      .catch(error => {
        // 401 error occurs if token is either missing or bad
        if (error.response && error.response.status && (error.response.status === 401)) {
          if (error.response.data.message === "ID Mismatch") {
            // the user is trying to delete a meeting not belonging to them
            window.location.href = "/meetings"
          } else if (cookies.get("token")) {
            // The token is invalid
            cookies.remove("token", { path: '/' }) 
            window.location.href = "/login"
          } else {
            // there is no token set
            window.location.href = "/login"
          }
        }
      })
  }

  const classes = useStyles();

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar tab="Meetings" type="Back" />

      <Grid container direction="column" justifyContent="center" style={{ minHeight: "70vh" }}>

        <MeetingDetails meeting={meetingInfo} />

        <div className={classes.row}>
          <div className={classes.meetingQuestions}>
            <MeetingQuestions />
          </div>
          <div className={classes.meetingAnswers}>
            <MeetingAnswers meeting={meetingInfo} />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.meetingQuestions}>
            <ParticipantsAndTopics meeting={meetingInfo} people={allPeople} />
          </div>
        </div>

        <Box className={classes.buttonsContainer} >
          <EditDetailsButton fontSize="large" className={classes.editButton} meetingInfo={meetingInfo}/>
          <DeleteButton fontSize="large" className={classes.deleteButton} />
        </Box>
        
      </Grid>
    </ThemeProvider>
  )
};

export default MeetingInfoPage;
