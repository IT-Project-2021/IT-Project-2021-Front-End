import React, { useState } from 'react';
import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
//general components in use
import PageAppBar from "../components/PageAppBar"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';


const palette = Theme.palette
const useStyles = makeStyles({
    contactDetails: {
      color: palette.tertiary.main,
    },
    meetingDescription: {
      color: palette.tertiary.main,
      padding: "20px 00px 00px 33px",
      textAlign: "left",
    },
    editButtonContainer: {
        position: "fixed", 
        bottom: 0,
        width: "100%",
        justifyContent: "flex-end",
        display: "flex",
        padding: "4em",
        
    },
    editButton: {
        fontSize: "large",
        color: palette.tertiary.main,
        backgroundColor: palette.quarternary.main
    },
    meetingDetails: {
        textAlign: "left",
        padding: "30px 00px 0px 33px"
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    meetingQuestions: {
      textAlign: "left",
      padding: "30px 50px 0px 50px"
    },
    meetingAnswers: {
      textAlign: "left",
      padding: "40px 120px 0px 120px"
    },
});

const MeetingDetails = () => {

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Box >
      <form>
        <Box className={classes.meetingDetails}>
          <TextField
            hiddenLabel
            id="meeting-title"
            placeholder="Enter Title"
            size="large"
            inputProps={{style: {fontSize: 40, fontWeight: 'bold'}}}
            onChange={(e) => { setTitle(e.target.value); }}
          />
        </Box>

        <Box className={classes.meetingDescription}>
          <TextField
            id="meeting-description"
            placeholder="Enter meeting description here..."
            multiline
            variant="filled"
            onChange={(e) => { setDescription(e.target.value); }}
          />
        </Box>
      </form>
    </Box>
  )
}

const ConfirmButton = () => {
  const classes = useStyles();
  return (
    <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
      <Typography variant="button" color="secondary">Confirm</Typography>
    </Button>
  )
}

const MeetingQuestions = () => {
  return (
      
    <Box mt="40px">
      <Box mb="40px">
        <Typography variant="h2">
          Date/Time: 
        </Typography>
      </Box>
      
      <Box mb="40px">
        <Typography variant="h2">
          Location:
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="h2">
          Reminder:
        </Typography>
      </Box>

      
    </Box>
  )
};



const MeetingAnswers = () => {

  const [value, setValue] = React.useState(new Date());
  const [location, setLocation] = useState("");

  return (
    <Box mt="40px">
      
      <Box mb="40px">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>
      
      <form> 
        <Box mb="40px">
          <TextField
            hiddenLabel
            id="meeting-location"
            placeholder="Enter Location"
          />
        </Box>
      </form>

      <Box>
        <Select labelId="label" id="select" value="60">
          <MenuItem value="5">5 minutes before</MenuItem> 
          <MenuItem value="15">15 minutes before</MenuItem>
          <MenuItem value="30">30 minutes before</MenuItem>
          <MenuItem value="60">1 hour before</MenuItem>
          <MenuItem value="120">2 hours before</MenuItem>
          <MenuItem value="1440">1 day before</MenuItem>
        </Select>    
      </Box>

      
    </Box>
  )
}

const ParticipantsAndTopics = ({numParticipants, participants, changeNumParticipants, addParticipant}) => {

  console.log("numParticipants (from child):", numParticipants)
  console.log("participants (from child):", participants)
  console.log("0th participant:", participants[0])

  const handleParticipantChange = (event) => {
    console.log("value:", event.target.value)
    console.log("target:", event.target)

    // TODO update "participants" with new name

    // add a new participant if the edited participant was the last in the list
    console.log("event.target.id =", event.target.id)
    console.log("numParticipants =", numParticipants)

    if (parseInt(event.target.id) === numParticipants) {

      // add an element to the participants array
      let newItem = {
        name: "",
        id: (numParticipants + 1).toString()
      }
      addParticipant(newItem)

      // increase number of participants
      changeNumParticipants(numParticipants + 1);

    }
  }

  return (
    <Box mt="40px">

      <Box mb="40px"> 
        <Typography variant="h2">
          Participants
        </Typography>
      </Box>
      
      <Box mb="40px" ml="20px">
        {participants.map(participant => 
          <TextField
            hiddenLabel
            id={participant.id}
            placeholder="+ add participant"
            onChange={handleParticipantChange}
          />
        )}
      </Box>

      <Box mb="40px">
        <Typography variant="h2">
          Agenda
        </Typography>
      </Box>

      <Box mb="40px" ml="20px">
        <TextField
          hiddenLabel
          id="agenda"
          placeholder="+ add topic"
        />
      </Box>

    </Box>
  )
}

const CreateMeetingPage = () => {

  const [numParticipants, setNumParticipants] = useState(1)
  const [participants, setParticipants] = useState([{name: "", id: "1"}])
  console.log("num participants (from parent):", numParticipants)
  console.log("participants (from parent):", participants)

  const changeNumParticipants = (newNum) => {
    setNumParticipants(newNum)
    console.log("there are now", newNum, "participants")
  } 

  const addParticipant = (newParticipant) => {
    console.log("participants BEFORE:", participants)
    console.log("trying to add participant:", newParticipant)
    setParticipants(participants.concat(newParticipant))
    console.log("participants AFTER:", participants)
  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar prevPage="/Meetings" tab="Meetings"/>

        <Grid style={{minHeight: "90vh"}}>
          
          <MeetingDetails />

          <div className={classes.row}>
            <div className={classes.meetingQuestions}>
              <MeetingQuestions />
            </div>
            <div className={classes.meetingAnswers}>
              <MeetingAnswers />
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.meetingQuestions}>
              <ParticipantsAndTopics 
                numParticipants={numParticipants} 
                participants={participants} 
                changeNumParticipants={changeNumParticipants}
                addParticipant={addParticipant}
              />
            </div>
          </div>
        
          <Box px="20px" marginTop="clamp(25px, 12%, 50px)">
          <Link to="/Meetings" style={{ textDecoration: 'none' }}>
            <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
              <Typography variant="button" color="secondary">Confirm</Typography>
            </Button>
          </Link>
        </Box>


        </Grid>

    </ThemeProvider>
)};

export default CreateMeetingPage;
