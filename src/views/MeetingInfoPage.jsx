
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
      padding: "30px 00px 0px 33px",
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

      <Box className={classes.meetingDescription}>
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
  return (
    <Box>
      <Box mt="40px">
        <Typography variant="h2">
          Date/Time:
        </Typography>
        <Typography variant="h2">
          Location:
        </Typography>
        <Typography variant="h2">
          Reminder:
        </Typography>
        <Typography variant="h2">
          Participants:
        </Typography>
        <Typography variant="h2">
          Agenda:
        </Typography>
      </Box>
    </Box>
  )
}

const PeopleInfoPage = () => {

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar prevPage="/Meeting" tab="Meetings"/>

        <Grid style={{minHeight: "90vh"}}>
          
          <MeetingDetails />

          <MeetingHistory />

          <Box display="inline" px="25px">
            <EditDetailsButton />
          </Box>

        </Grid>

    </ThemeProvider>
)};

export default PeopleInfoPage;
