
import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const palette = Theme.palette
const useStyles = makeStyles({
    contactDetails: {
      color: palette.tertiary.main,
    },
    meetingDescription: {
      color: palette.tertiary.main,
      padding: "3vh 0vh 3vh",
      textAlign: "left",
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
    meetingDetails: {
      textAlign: "left",
      padding: "3vh 3vh 0vh"
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
    }
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

const MeetingAnswers = () => {
  
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.meetingAnswers}>
        <Typography variant="h3">
          8/8/2021 3PM 
        </Typography>
      </Box>
      

      <Box className={classes.meetingAnswers}>
        <Typography variant="h3">
          Melbourne
        </Typography>
      </Box>

      <Box className={classes.meetingAnswers}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="open-select-label">Reminder</InputLabel>
          <Select labelId="label" id="select" labelId="open-select-label" id="-open-select">
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

const ParticipantsAndTopics = () => {
  const classes = useStyles();
  return (
    
    <Box mt="40px">

      <Box className={classes.meetingQuestions}> 
        <Typography variant="h3" className={classes.bold}>
          Participants
        </Typography>
      </Box>
      
      <Box className={classes.meetingAnswers}>
        <Typography variant="h3">
          John Doe
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
        
        <Typography variant="h3">
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

      <Box className={classes.meetingQuestions}>
        <Typography variant="h3" className={classes.bold}>
          Agenda
        </Typography>
      </Box>

      <Box className={classes.meetingAnswers}>
        <Typography variant="h3">
          Topic 1
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
        
        <Typography variant="h3">
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

        <Grid container direction="column" justifyContent="center" style={{ minHeight: "80vh" }}>
          
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
