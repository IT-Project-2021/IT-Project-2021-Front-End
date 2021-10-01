import React from 'react';

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
  return (
    <Box >
      <Box className={classes.meetingDetails}>
        <TextField
          hiddenLabel
          id="meeting-title"
          placeholder="Enter Title"
          size="large"
          inputProps={{style: {fontSize: 40, fontWeight: 'bold'}}} // font size of input text
        />
      </Box>

      <Box className={classes.meetingDescription}>
        <TextField
          id="meeting-description"
          placeholder="Enter meeting description here..."
          multiline
          variant="filled"
        />
      </Box>
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
      

      <Box mb="40px">
        <TextField
          hiddenLabel
          id="meeting-location"
          placeholder="Enter Location"
        />
      </Box>

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

const ParticipantsAndTopics = () => {
  return (
    <Box mt="40px">

      <Box mb="40px"> 
        <Typography variant="h2">
          Participants
        </Typography>
      </Box>
      
      <Box mb="40px" ml="20px">
        <TextField
          hiddenLabel
          id="participant"
          placeholder="+ add participant"
        />
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
              <ParticipantsAndTopics />
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
