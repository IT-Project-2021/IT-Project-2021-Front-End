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

const MeetingDetails = ({handleTitleChange, handleDescChange}) => {

  const changeTitle = (event) => {
    handleTitleChange(event.target.value)
  }

  const changeDesc = (event) => {
    handleDescChange(event.target.value)
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

          />
        </Box>

        <Box className={classes.meetingDescription}>
          <TextField
            id="meeting-description"
            placeholder="Enter description"
            multiline
            onChange={changeDesc}

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
      <Typography variant="button" onClick={submitMeeting}>Confirm</Typography>
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




const MeetingAnswers = ({handleTimeChange, handleLocationChange, handleAlertSettingChange}) => {

  const [time, setTime] = React.useState(new Date());

  const changeMeetingTime = (event) => {
    setTime(event)
    handleTimeChange(event)
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
            onChange={(event) => handleLocationChange(event.target.value)}
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
            onChange={(event) => handleAlertSettingChange(event.target.value)}
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

const ParticipantsAndTopics = ({agendaLength, agenda, changeAgendaLength, addAgenda, contacts, changeParticipants, origParticipants}) => {

  const handleAgendaChange = (event) => {

    // update "agenda" with new item
    let updatedItem = agenda.filter(item => item.id === event.target.id)[0]
    updatedItem.name = event.target.value
    
    // add a new item if the edited item was the last in the list

    if (parseInt(event.target.id) === agendaLength) {

      // add an element to the agenda array
      let newItem = {
        name: "",
        id: (agendaLength + 1).toString()
      }
      addAgenda(newItem)

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
        {agenda.map(item => 
        <Box>
          <TextField
            hiddenLabel
            id={item.id}
            placeholder="+ add topic"
            onChange={handleAgendaChange}
            key={item.id}
          /> <br></br>
        </Box>
        )}
        
      </Box>

    </Box>
  )
}

const CreateMeetingPage = () => {

  const [agendaLength, setAgendaLength] = useState(1)
  const [agenda, setAgenda] = useState([{name: "", id: "1"}])
  const [peopleList, setPeopleList] = useState([])
  const [participants, setParticipants] = useState([])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("")
  const [alertSetting, setAlertSetting] = useState("")

  // this will be set if this page was accessed from the People Info page
  const {id} = useParams();

  // get the list of contacts from the database
  useEffect(() => {
    const cookies = new Cookies()
    peopleService
      .getAll(cookies.get("token"))
      .then(response => {
        setPeopleList(response.data)
        // if redirected here from People Info, set the contact as a participant
        if (id) {
          setParticipants(response.data.filter(item => item._id === id))
        }
      })
      .catch(error => {
        // 401 error occurs if token is either missing or bad
        if (error.response && error.response.status && (error.response.status === 401)) {
          if (cookies.get("token")) {
              // The token is invalid
              cookies.remove("token", { path: '/' }) 
          }
          window.location.href = "/login"
        } else {
          alert("An unknown error occurred. Please try reloading the page.")
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
    const newMeeting = {
      participants: participants.map(item => item._id),
      agenda: agenda.map(item => item.name).filter(item => item),
      title: title,
      details: description,
      date: time,
      location: location,
      alerts: getAlerts()
    }

    // submit the entry
    const cookies = new Cookies()
    meetingService
      .create(newMeeting, cookies.get("token"))
      .then(response => {
        let newID = response.data._id
        window.location.href = "/MeetingInformation/" + newID

      })
      .catch(error => {
        // 401 error occurs if token is either missing or bad
        if (error.response && error.response.status && (error.response.status === 401)) {
          if (cookies.get("token")) {
            // The token is invalid
            cookies.remove("token", { path: '/' }) 
          }
          window.location.href = "/login"
        } else {
          alert("An unknown error occurred. Please try reloading the page.")
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

export default CreateMeetingPage;
