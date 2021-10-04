import React, { useState } from 'react';
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

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


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
    padding: "3vh 3vh 0vh"
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
            placeholder="Enter description"
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
    <Button className={classes.confirmButton} variant="contained" type="submit" >
      <Typography variant="button">Confirm</Typography>
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

const MeetingAnswers = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(new Date());
  const [location, setLocation] = useState("");

  return (
    <Box>
      <Box className={classes.meetingAnswers}>
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
        <Box className={classes.meetingAnswers}>
          <TextField
            hiddenLabel
            id="meeting-location"
            placeholder="Enter Location"
          />
        </Box>
      </form>

      <Box className={classes.meetingAnswers}>
      <FormControl>
          <InputLabel id="open-select-label">Reminder</InputLabel>
          <Select label="Reminder" id="select" labelId="open-select-label">
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value={5}>5 minutes before</MenuItem> 
            <MenuItem value={15}>15 minutes before</MenuItem>
            <MenuItem value={30}>30 minutes before</MenuItem>
            <MenuItem value={60}>1 hour before</MenuItem>
            <MenuItem value={120}>2 hours before</MenuItem>
            <MenuItem value={1440}>1 day before</MenuItem>
          </Select>    
        </FormControl>  
      </Box>
    </Box>
  )
}

const ParticipantsAndTopics = ({agendaLength, agenda, changeAgendaLength, addAgenda}) => {

  console.log("agendaLength (from child):", agendaLength)
  console.log("agenda (from child):", agenda)
  console.log("0th agenda:", agenda[0])

  const handleAgendaChange = (event) => {
    console.log("value:", event.target.value)
    console.log("target:", event.target)

    // TODO update "agenda" with new item

    // add a new item if the edited item was the last in the list
    console.log("event.target.id =", event.target.id)
    console.log("agendaLength =", agendaLength)

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

  return (
    <Box mt="40px">

      <Box className={classes.meetingQuestions}> 
        <Typography variant="h3" className={classes.bold}>
          Participants
        </Typography>
      </Box>
      
      <Box className={classes.meetingAnswers}>
        <TextField
          hiddenLabel
          id="participants"
          placeholder="+ add participant"
        />
      </Box>

      <Box className={classes.meetingQuestions}> 
        <Typography variant="h3" className={classes.bold}>
          Agenda
        </Typography>
      </Box>

      <Box className={classes.meetingAnswers}>
        {agenda.map(item => 
          <TextField
            hiddenLabel
            id={item.id}
            placeholder="+ add topic"
            onChange={handleAgendaChange}
          />
        )}
      </Box>

    </Box>
  )
}

const CreateMeetingPage = () => {

  const [agendaLength, setAgendaLength] = useState(1)
  const [agenda, setAgenda] = useState([{name: "", id: "1"}])
  console.log("agenda length (from parent):", agendaLength)
  console.log("agenda (from parent):", agenda)

  const changeAgendaLength = (newNum) => {
    setAgendaLength(newNum)
    console.log("there are now", newNum, "items in agenda")
  } 

  const addAgenda = (newItem) => {
    console.log("agenda BEFORE:", agenda)
    console.log("trying to add item:", newItem)
    setAgenda(agenda.concat(newItem))
    console.log("agenda AFTER:", agenda)
  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar prevPage="/Meetings" tab="Meetings"/>

        <Grid container direction="column" justifyContent="center" style={{ minHeight: "70vh" }}>
          
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
                agendaLength={agendaLength} 
                agenda={agenda} 
                changeAgendaLength={changeAgendaLength}
                addAgenda={addAgenda}
              />
            </div>
          </div>
        
          <Box className={classes.confirmButtonContainer} >
            <Link to="/Meetings" style={{ textDecoration: 'none' }}>
              <ConfirmButton fontSize="large" className={classes.confirmButton}/>
            </Link>
          </Box>


        </Grid>

    </ThemeProvider>
)};

export default CreateMeetingPage;
