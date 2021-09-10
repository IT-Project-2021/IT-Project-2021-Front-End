
import Theme from "../themes/basicTheme";

import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
//general components in use
import PageAppBar from "../components/PageAppBar"

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
    leftText: {
        textAlign: "left",
        padding: "30px 00px 0px 33px"
    },
});

const MeetingDetails = () => {

  const classes = useStyles();
  return (
    <Box >
      <Box className={classes.leftText}>
        <Typography variant="h1">Meeting 1</Typography>
      </Box>

      <Box className={classes.leftText}>
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

const MeetingHistory = () => {

  const classes = useStyles();

  return (
    <Box>

      <Box mt="40px" className={classes.leftText}>
        <Box mb="40px">
          <Typography variant="h2">
            Date/Time: 
          </Typography>
          <Typography variant="h4" >
            8/8/2021 3PM
          </Typography>
        </Box>

        <Box mb="40px">
          <Typography variant="h2">
            Location:
          </Typography>
          <Typography variant="h4" >
            Melbourne
          </Typography>
        </Box>

        <Box mb="40px">
          <Typography variant="h2">
            Reminder:
          </Typography>
          <Typography variant="h4" >
            1 hour before
          </Typography>
        </Box>

        <Box mb="40px" style={{minHeight: "10vh"}}>
          <Typography variant="h2">
            Participants
          </Typography>
          <Typography variant="h4" >
            John Doe
          </Typography>
          <Typography variant="h4" >
            Jane Doe
          </Typography>
        </Box>

        <Box mb="40px" style={{minHeight: "10vh"}}>
          <Typography variant="h2">
            Agenda
          </Typography>
          <Typography variant="h4">
            Topic 1
          </Typography>
          <Typography variant="h4" >
            Topic 2
          </Typography>
        </Box>
        
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

          <MeetingHistory />

          <Box className={classes.editButtonContainer} >
            <EditDetailsButton fontSize="large" className={classes.editButton}/>
          </Box>


        </Grid>

    </ThemeProvider>
)};

export default MeetingInfoPage;
