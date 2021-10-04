
import Theme from "../themes/basicTheme";

import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
//general components in use
import PageAppBar from "../components/PageAppBar"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const palette = Theme.palette
const useStyles = makeStyles({
    contactDetails: {
      color: palette.tertiary.main,
    },
    meetingDescription: {
      color: palette.tertiary.main,
      padding: "20px 00px 0px 33px",
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
      padding: "30px 120px 0px 120px"
    },
});

const MeetingDetails = () => {

  const classes = useStyles();
  return (
    <Box >
      <Box className={classes.meetingDetails}>
        <Typography variant="h1">Meeting 1</Typography>
      </Box>

      <Box className={classes.meetingDetails}>
        <Typography variant="body1">
            Meeting Description
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
  return (
    <Box mt="40px">
      
      <Box mb="40px">
        <Typography variant="h2">
          8/8/2021 3PM 
        </Typography>
      </Box>
      

      <Box mb="40px">
        <Typography variant="h2">
          Melbourne
        </Typography>
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
        <Typography variant="h2">
          John Doe
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
        
        <Typography variant="h2">
          Jane Doe
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
        
        <Button> 
          <IconButton edge="end" aria-label="add">
            <AddIcon /> Add Participant
          </IconButton>
        </Button>
      </Box>

      <Box mb="40px">
        <Typography variant="h2">
          Agenda
        </Typography>
      </Box>

      <Box mb="40px" ml="20px">
        <Typography variant="h2">
          Topic 1
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
        
        <Typography variant="h2">
          Topic 2
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
        
        <Button> 
          <IconButton edge="end" aria-label="add">
            <AddIcon /> Add Topic
          </IconButton>
        </Button>
      </Box>

    </Box>
  )
}

const MeetingInfoPage = () => {
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

          <Box className={classes.editButtonContainer} >
            <EditDetailsButton fontSize="large" className={classes.editButton}/>
          </Box>


        </Grid>

    </ThemeProvider>
)};

export default MeetingInfoPage;
