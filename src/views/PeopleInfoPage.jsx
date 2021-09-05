
import Theme from "../themes/basicTheme";

import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const palette = Theme.palette
const useStyles = makeStyles({
    contactDetails: {
      color: palette.tertiary.main,
    },
    contactNotes: {
      fontStyle: "italic",
      color: palette.tertiary.main,
      padding: "20px 0 40px 0"
    },
    contactNumbers: {
      padding: "0 0 20px 0",
      color: palette.tertiary.main,
      textDecoration: "underline"
    },
    editButton: {
      color: palette.secondary.main,
      backgroundColor: palette.primary.main,
      margin: "10px"
    }
});

const PersonDetails = () => {

  const classes = useStyles();
  return (
    <Box >
      <Box className={classes.contactDetails}>
        <Typography variant="h1">Contact Name</Typography>
        <Typography variant="h2">Company • Position</Typography>
      </Box>

      <Box className={classes.contactNotes}>
        <Typography variant="body1">
            Optional notes about the contact.
        </Typography>
      </Box>

      <Box className={classes.contactNumbers}>
        <Typography variant="body1">
            email@address
        </Typography>
        <Typography variant="body1">
            0123 456 789
        </Typography>
      </Box>
    </Box>
  )
}

const SetMeetingButton = () => {
  const classes = useStyles();
  return (
    <Button className={classes.editButton} variant="contained" type="submit" >
      <Typography variant="button">Set Meeting</Typography>
    </Button>
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

const PastMeeting = () => {
  return (
    <Box>
      <Box ml="30px" mt="30px">
          <Typography variant="body1" align="left">
            08/08/2021, 3:00pm <br></br> Discuss XYZ 
          </Typography>
      </Box>

      <Box ml="60px">
        <Typography variant="body1" align="left">
            • with Contact, Contact
        </Typography>   
      </Box>
    </Box>
  )
}

const MeetingHistory = () => {
  return (
    <Box>
      <Box mt="40px">
        <Typography variant="h2" align="center">
          Meeting History
        </Typography>
      </Box>

    <ul>
      <li><PastMeeting /></li>
    </ul>
      
    </Box>
  )
}

const PeopleInfoPage = () => {

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
        <AppBar position="static" color="secondary" align="left" >
          <Box ml="50px" my="20px">
              <Typography variant="h6">
              People
              </Typography>
          </Box>
        </AppBar>

        <Grid container direction="column" justifyContent="center" style={{minHeight: "90vh"}}>
          
          <PersonDetails />

          <Box display="inline" px="20px">
            <SetMeetingButton />
            <EditDetailsButton />
          </Box>

        <MeetingHistory />

        </Grid>

    </ThemeProvider>
)};

export default PeopleInfoPage;
