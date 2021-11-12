import React, { useState, useEffect } from 'react'
import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import peopleService from "../services/people"
import meetingService from "../services/meetings"
import FormControl from '@material-ui/core/FormControl';
import { useParams } from "react-router-dom"
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
  confirmButtonContainer: {
    position: "fixed", 
    bottom: "0vh",
    width: "95%",
    justifyContent: "flex-end",
    display: "flex",
    padding: "4vh",        
  },
  confirmButton: {
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
    padding: "3vh 1vh 1vh",
    textAlign: "left",
  },
  bold: {
    fontWeight: 600
  },
  listItems: {
    padding: "1vh 3vh 2vh",
    textAlign: "left",
  },
});

const MeetingDetails = ({handleTitleChange, handleDescChange, oldInfo}) => {

  // Get state
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [loaded, setLoaded] = useState(false)

  if (!loaded && oldInfo && (Object.keys(oldInfo).length > 0)) {
    setTitle(oldInfo.title)
    handleTitleChange(oldInfo.title)
    setDetails(oldInfo.details)
    handleDescChange(oldInfo.details)
    setLoaded(true)
  }


  const changeTitle = (event) => {
    handleTitleChange(event.target.value)
    setTitle(event.target.value)
  }

  const changeDesc = (event) => {
    handleDescChange(event.target.value)
    setDetails(event.target.value)
  }

  const classes = useStyles();
  return (
    <Box >
      <form>
        <Box className={classes.meetingDetails}>
          <TextField
            hiddenLabel
            id="meeting-title"
            placeholder="Enter Title"
            variant="filled"
            inputProps={{style: {fontSize: 40, fontWeight: 'bold'}}}
            onChange={changeTitle}
            value={title}

          />
        </Box>

        <Box className={classes.meetingDescription}>
          <TextField
            id="meeting-description"
            placeholder="Enter description"
            multiline
            onChange={changeDesc}
            value={details}
          />
        </Box>
      </form>
    </Box>
  )
}

const ConfirmButton = ({submitMeeting}) => {
  const classes = useStyles();
  return (
    <Button className={classes.confirmButton} variant="contained" type="submit" >
      <Typography variant="button" onClick={submitMeeting}>Save Changes</Typography>
    </Button>
  )
}

const MeetingQuestions = () => {
  const classes = useStyles();
  return (
      
    <Box> 
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




const MeetingAnswers = ({handleTimeChange, handleLocationChange, handleAlertSettingChange, oldInfo}) => {

  const [time, setTime] = React.useState(new Date());
  const [location, setLocation] = useState("")
  const [alertSetting, setAlertSetting] = useState("")

  // Set state once when the old information is loaded
  const [loaded, setLoaded] = useState(false)
  if (!loaded && oldInfo && (Object.keys(oldInfo).length > 0)) {
    setTime(new Date(oldInfo.date))
    handleTimeChange(new Date(oldInfo.date))
    setLocation(oldInfo.location)
    handleLocationChange(oldInfo.location)
    let oldAlertSetting = ""
    if (oldInfo.alerts.length === 0) {
      oldAlertSetting = ""
    } else {
      oldAlertSetting = oldInfo.alerts[0].alertSetting
    }
    setAlertSetting(oldAlertSetting)
    handleAlertSettingChange(oldAlertSetting)
    setLoaded(true)
  }

  const changeMeetingTime = (event) => {
    setTime(event)
    handleTimeChange(event)
  }

  const changeLocation = (event) => {
    handleLocationChange(event.target.value)
    setLocation(event.target.value)
  }
  const changeAlertSetting = (event) => {
    handleAlertSettingChange(event.target.value)
    setAlertSetting(event.target.value)
  }

  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.meetingAnswers}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            value={time}
            onChange={changeMeetingTime}
          />
        </LocalizationProvider>
      </Box>
      
      <form> 
        <Box className={classes.meetingAnswers}>
          <TextField
            hiddenLabel
            id="meeting-location"
            placeholder="Enter Location"
            onChange={changeLocation}
            value={location}
          />
        </Box>
      </form>


      <Box className={classes.meetingAnswers}>
      <FormControl>
          <Select 
            defaultValue="" 
            label="Reminder" 
            id="select" 
            labelId="open-select-label" 
            displayEmpty 
            onChange={changeAlertSetting}
            value={alertSetting}
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

const ParticipantsAndTopics = ({agendaLength, agenda, changeAgendaLength, addAgenda, contacts, changeParticipants, origParticipants, oldInfo}) => {

  const [curAgenda, setCurAgenda] = useState([])

  // Set state once when the old information is loaded
  const [loaded, setLoaded] = useState(false)
  if (!loaded && oldInfo && (Object.keys(oldInfo).length > 0)) {

    const newAgendaObject = []
    for (let i = 0; i<oldInfo.agenda.length; i++) {
      let newAgenda = {name: oldInfo.agenda[i], id: (i+1).toString()}
      newAgendaObject.push(newAgenda)
    }
    if (newAgendaObject.length === 0) {
      let newAgenda = {name: "", id: "1"}
      newAgendaObject.push(newAgenda)
    } 

    addAgenda(newAgendaObject)
    setCurAgenda(newAgendaObject)
    changeAgendaLength(newAgendaObject.length)
    setLoaded(true)
  }

  const sortAgenda = (a1, a2) => {
    if (a1.id < a2.id) {
      return -1
    } else return 1
  }


  const handleAgendaChange = (event) => {

    // update "agenda" with new item
    // NOTE this might be causing strange behaviour, check here if there's problems

    let updatedItem = agenda.filter(item => item.id === event.target.id)[0]
    updatedItem.name = event.target.value

    let curUpdatedItem = curAgenda.filter(item => item.id === event.target.id)[0]
    let others = curAgenda.filter(item => item.id !== (event.target.id.toString()))
    curUpdatedItem.name = event.target.value
    setCurAgenda(others.concat(curUpdatedItem).sort(sortAgenda))


    
    // add a new item if the edited item was the last in the list
    if (parseInt(event.target.id) === agendaLength) {

      // add an element to the agenda array
      let newItem = {
        name: "",
        id: (agendaLength + 1).toString()
      }
      addAgenda(newItem)


      // Update display
      let newAgendaObj = curAgenda
      newAgendaObj.push(newItem)
      setCurAgenda(newAgendaObj)

      // increase number of items
      changeAgendaLength(agendaLength + 1);

    }
  }
  const classes = useStyles();

  const handleParticipantChange = (event, value) => {
    changeParticipants(value)
  }

  return (
    <Box>

      <Box className={classes.meetingQuestions}> 
        <Typography variant="h3" className={classes.bold}>
          Participants
        </Typography>
      </Box>
      
      <Box className={classes.listItems}>

        <Autocomplete
          multiple
          value={origParticipants}
          options={contacts}
          getOptionLabel={(option) => (option.first_name + " " + option.last_name + " (" + option.position + " at " + option.company + ")")}
          sx={{ width: 300 }}
          placeholder="+ add participant"
          renderInput={(params) => <TextField {...params} placeholder="+ add participant" />}
          onChange={handleParticipantChange}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.first_name + " " + option.last_name + " (" + option.position + " at " + option.company + ")"}
              </li>
            );
          }}
        />

      </Box>

      <Box className={classes.meetingQuestions}> 
        <Typography variant="h3" className={classes.bold}>
          Agenda
        </Typography>
      </Box>

      <Box className={classes.listItems}>
        {curAgenda.map(item => 
        <Box>
          <TextField
            hiddenLabel
            id={item.id}
            placeholder="+ add topic"
            onChange={handleAgendaChange}
            key={item.id}
            value={item.name}
          /> <br></br>
        </Box>
        )}
        
      </Box>

    </Box>
  )
}

const EditMeetingPage = () => {

  const [agendaLength, setAgendaLength] = useState(1)
  const [agenda, setAgenda] = useState([])
  const [peopleList, setPeopleList] = useState([])
  const [participants, setParticipants] = useState([])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("")
  const [alertSetting, setAlertSetting] = useState("")
  const [oldMeetingInfo, setOldMeetingInfo] = useState({})

  const {id} = useParams();

  // get the list of contacts from the database
  useEffect(() => {
    const cookies = new Cookies()
    peopleService
      .getAll(cookies.get("token"))
      .then(response => {
        setPeopleList(response.data)
        let people = response.data
        meetingService
          .getByID(id, cookies.get("token"))
          .then(meetingRes => {
            setOldMeetingInfo(meetingRes.data)
            // set the participants as those originally in the meeting
            let oldParticipants = meetingRes.data.participants
            setParticipants(people.filter(item => oldParticipants.includes(item._id)))
          })
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
      })
      .catch(error => {
        console.log("Failed to retrieve list of people from the server:", error)
        // 401 error occurs if token is either missing or bad
        if (error.response && error.response.status && (error.response.status === 401)) {
          if (cookies.get("token")) {
              // The token is invalid
              cookies.remove("token", { path: '/' }) 
          }
          window.location.href = "/login"
        }
      })

  }, [id])

  // change the number of items in the meeting agenda
  const changeAgendaLength = (newNum) => {
    setAgendaLength(newNum)
  } 
  // add an item to the agenda
  const addAgenda = (newItem) => {
    setAgenda(agenda.concat(newItem))
  }
  // update the participant list
  const changeParticipants = (newList) => {
    setParticipants(newList)
  }
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle)
  }
  const handleDescChange = (newDesc) => {
    setDescription(newDesc)
  }
  const handleTimeChange = (newTime) => {
    setTime(newTime)
  }
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }
  const handleAlertSettingChange = (newSetting) => {
    setAlertSetting(newSetting)
  }

  // construct the array of alerts to save in the database
  // with the construction of the page right now it is only possible to save max. 1 alert, but the database
  // design allows this to be changed later
  const getAlerts = () => {
    if (alertSetting === "") {
      return []
    } else return [ {alertTime: getAlertTime(), alertSetting: alertSetting} ]
  }

  const getAlertTime = () => {
    return new Date(time - alertSetting)
  }

  // submit the meeting to the database when the user clicks confirm
  const submitMeeting = () => {

    // TODO use pieces of state to create a meaningful database entry
    const updatedMeeting = {
      participants: participants.map(item => item._id),
      agenda: agenda.map(item => item.name).filter(item => item),
      title: title,
      details: description,
      date: time,
      location: location,
      alerts: getAlerts()
    }

    // Submit
    const cookies = new Cookies()
    meetingService
      .update(oldMeetingInfo._id, updatedMeeting, cookies.get("token"))
      .then(response => {
        let meetingID = response.data._id
        window.location.href = "/MeetingInformation/" + meetingID
      })
      .catch(error => {
        console.log("Something went wrong submitting the meeting:", error)
        // 401 error occurs if token is either missing or bad
        if (error.response && error.response.status && (error.response.status === 401)) {
          if (cookies.get("token")) {
            // The token is invalid
            cookies.remove("token", { path: '/' }) 
          }
          window.location.href = "/login"
        }
      })

  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar tab="Meetings" type="Back"/>

        <Grid container direction="column" justifyContent="center" style={{ minHeight: "65vh" }}>
          
          <MeetingDetails 
            handleTitleChange={handleTitleChange}
            handleDescChange={handleDescChange}
            oldInfo={oldMeetingInfo}
          />

          <div className={classes.row}>
            <div className={classes.meetingQuestions}>
              <MeetingQuestions />
            </div>
            <div className={classes.meetingAnswers}>
              <MeetingAnswers 
                handleTimeChange={handleTimeChange}
                handleLocationChange={handleLocationChange}
                handleAlertSettingChange={handleAlertSettingChange}
                oldInfo={oldMeetingInfo}
              />
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.meetingQuestions}>
              <ParticipantsAndTopics 
                agendaLength={agendaLength} 
                agenda={agenda} 
                changeAgendaLength={changeAgendaLength}
                addAgenda={addAgenda}
                contacts={peopleList}
                changeParticipants={changeParticipants}
                origParticipants={participants}
                oldInfo={oldMeetingInfo}
              />
            </div>
          </div>

          <Box className={classes.confirmButtonContainer} >
            <Link to="/Meetings" style={{ textDecoration: 'none' }}>
              <ConfirmButton fontSize="large" className={classes.confirmButton} submitMeeting={submitMeeting}/>
            </Link>
          </Box>


        </Grid>

    </ThemeProvider>
)};

export default EditMeetingPage;
