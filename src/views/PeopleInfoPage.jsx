
import Theme from "../themes/basicTheme";
import { useParams } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar"
import peopleService from "../services/people"
import meetingService from "../services/meetings"
import React, { useState, useEffect } from 'react'
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";

const palette = Theme.palette
const useStyles = makeStyles({
    contactDetails: {
      color: palette.tertiary.main,
    },
    contactNotes: {
      fontStyle: "italic",
      color: palette.tertiary.main,
      padding: "20px 0 40px 0"
    },
    contactNumbers: {
      padding: "0 0 20px 0",
      color: palette.tertiary.main,
      textDecoration: "underline"
    },
    editButton: {
      color: palette.secondary.main,
      backgroundColor: palette.primary.main,
      margin: "10px"
    },
    meetingList: {
      listStyleType: "none"
    },
    divider: {
      background: palette.quarternary.main,
    },
    meetingButton: {
      color: palette.tertiary.main,
      justifyContent: "flex-start",
      flexDirection: "column",
      textTransform: "none",
    },
    meetingLink: {
      textDecoration: "none",
      justifyContent: "flex-start",
      flexDirection: "column"
    },
});

const PersonDetails = ({details}) => {

  // change display of company information based on information available
  const CompanyInfo = () => {
    if ((details.company === undefined && details.position === undefined) || (details.company === "" && details.position === "")) {
      return null
    } else if ((details.company === undefined) || (details.company === "")) {
      return (<Typography variant="h2">{details.position}</Typography>)
    } else if ((details.position === undefined) || (details.position === "")) {
      return (<Typography variant="h2">{details.company}</Typography>)
    } else {
      return (<Typography variant="h2">{details.company} • {details.position}</Typography>)
    }
  }

  // change display of notes based on information available
  const PersonNotes = () => {
    if (details.notes === undefined || details.notes === "") {
      return null
    } else {
      return (<Typography variant="body1">{details.notes}</Typography>)
    }
  }

  console.log("details:", details)
  const classes = useStyles();
  return (
    <Box >
      <Box className={classes.contactDetails}>
        <Typography variant="h1">{details.first_name + " " + details.last_name}</Typography>
        <CompanyInfo />
      </Box>

      <Box className={classes.contactNotes}>
        <PersonNotes />
      </Box>

      <Box className={classes.contactNumbers}>
        <Typography variant="body1">
            {details.email}
        </Typography>
        <Typography variant="body1">
            {details.phone_num}
        </Typography>
      </Box>
    </Box>
  )
}

const SetMeetingButton = () => {
  const classes = useStyles();
  return (
    <Button className={classes.editButton} variant="contained" type="submit" >
      <Typography variant="button">Set Meeting</Typography>
    </Button>
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

const PastMeeting = ({meeting}) => {

  // extract contact name
  const getName = (participant) => {
    return participant.first_name + " " + participant.last_name
  }

  // format the list of participants
  const formatParticipants = (participants) => {
    if (participants.length === 1) {
      return "• with " + getName(participants[0])
    } else if (participants.length === 2) {
      return "• with " + getName(participants[0]) + " and " + getName(participants[1])
    } else {
      let formatted = "• with "
      for (let i = 0; i<participants.length - 1; i++) {
        formatted += getName(participants[i]) + ", "
      }
      formatted += "and " + getName(participants[participants.length - 1])
      return formatted
    }
    return ""
  }

  // format meeting date/time
  const formatDate = (dateString) => {
    let meetTime = new Date(dateString)
        
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


  const classes = useStyles();
  return (


    <Box>
        <Link to="/MeetingInformation" className={classes.meetingLink} >
            <Button className={classes.meetingButton} fullWidth={true} >
                <div>
                  <Box ml="30px" mt="30px">
                      <Typography variant="body1" align="left">
                        <em>{formatDate(meeting.date)}</em> <br></br> {meeting.title}
                      </Typography>
                  </Box>

                  <Box ml="60px">
                    <Typography variant="body1" align="left">
                        {formatParticipants(meeting.participants)}
                    </Typography>   
                  </Box>
                </div>
            </Button>
        </Link>
        <Divider className={classes.divider} />
    </Box>

    // <Box>
      // <Box ml="30px" mt="30px">
      //     <Typography variant="body1" align="left">
      //       <em>{formatDate(meeting.date)}</em> <br></br> {meeting.title}
      //     </Typography>
      // </Box>

      // <Box ml="60px">
      //   <Typography variant="body1" align="left">
      //       {formatParticipants(meeting.participants)}
      //   </Typography>   
      // </Box>

    //   <Divider className={classes.divider} />
    // </Box>
  )
}

const MeetingHistory = ({meetings}) => {

  console.log("meeting history (from child):", meetings)
  console.log("meeting mapping:", meetings.map(meeting => meeting.title))

  const classes = useStyles();
  return (
    <Box>

      <Box mt="40px">
        <Typography variant="h2" align="center">
          Meeting History
        </Typography>
      </Box>

      <ul className={classes.meetingList}>
        {meetings.map(item => 
            <li key={item._id}>
              <PastMeeting meeting={item}/>
            </li>
        )}
      </ul>
      
    </Box>
  )
}

const PeopleInfoPage = () => {

  // Page will display dummy info before it has loaded properly
  const dummyInfo = {
    first_name: "",
    last_name: "",
    email: "",
    phone_num: "",
  }

  // info to load from backend
  let {id} = useParams();
  const [contactInfo, setContactInfo] = useState(dummyInfo)
  const [meetingHistory, setMeetingHistory] = useState([])

  // get user info and meeting history from server
  console.log("person id:", id);
  useEffect(() => {
    peopleService
      .getByID(id)
      .then(response => {
        setContactInfo(response.data)
      })
      .catch(error => {
        console.log("Failed to retrieve person info from the server")
      })
    meetingService
    .getByParticipant(id)
    .then(response => {
      setMeetingHistory(response.data)
      console.log("meeting history:", response.data)
    })
    .catch(error => {
      console.log("Failed to retrieve meeting history from the server")
    })
  }, [id])
  console.log("meetingHistory:", meetingHistory)
  console.log("TEST MAPPING:", meetingHistory.map(meeting => meeting.title) )



  // maintain list of people from the server
  const [peopleList, setPeopleList] = useState([])

  // retrieve the list of people
  useEffect(() => {
      peopleService
          .getAll()
          .then(response => {
              setPeopleList(response.data)
          })
          .catch(error => {
              console.log("Failed to retrieve list of people from the server:", error)
          })
  }, [])
  console.log("peopleList:", peopleList)

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar prevPage="/People" tab="People" type="Back"/>

        <Grid container direction="column" justifyContent="center" style={{minHeight: "90vh"}}>

          <PersonDetails details={contactInfo}/>

          <Box display="inline" px="20px">
            <SetMeetingButton />
            <EditDetailsButton />
          </Box>

          <MeetingHistory meetings={meetingHistory}/>


        </Grid>

    </ThemeProvider>
)};

export default PeopleInfoPage;
