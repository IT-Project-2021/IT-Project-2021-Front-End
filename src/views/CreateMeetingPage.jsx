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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';


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

  // SAMPLE: Contents of the user's contacts
  // TODO replace with a database query
  const contacts = [
    {label: "Isobel Byars", notes: "abc"},
    {label: "Daniel Fink", notes: "def"},
    {label: "Jamie Chin", notes: "ghi"},
    {label: "Emaad Beig", notes: "jkl"},
    {label: "Luke Castleman", notes: "mno"}
  ]

  return (
    <Box mt="40px">

      <Box mb="40px"> 
        <Typography variant="h2">
          Participants
        </Typography>
      </Box>
      
      <Box mb="40px" ml="20px">

        <Autocomplete
          multiple
          id="participant-list"
          options={contacts}
          getOptionLabel={(option) => option.label}
          sx={{ width: 300 }}

          placeholder="+ add participant"
          renderInput={(params) => <TextField {...params} placeholder="+ add participant" />}
          onChange={(event, value) => console.log(value)}
        />

      </Box>

      <Box mb="40px">
        <Typography variant="h2">
          Agenda
        </Typography>
      </Box>

      <Box mb="40px" ml="20px">
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
                agendaLength={agendaLength} 
                agenda={agenda} 
                changeAgendaLength={changeAgendaLength}
                addAgenda={addAgenda}
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
