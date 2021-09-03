
import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';

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

        <Grid container direction="column" alignItems="center" justifyContent="center" style={{minHeight: "90vh"}}>
          
          <Box mt="60px" mb="20px" bgcolor="primary" >
            <Typography variant="h1" align="center">
              Contact Name
            </Typography>
            <Typography variant="h2" align="center">
              Company • Position
            </Typography>
          </Box>

          <Box mb="40px" fontStyle="italic">
            <Typography variant="body1">
                Optional notes about the contact.
            </Typography>
          </Box>

          <Box mb="5px">
            <Typography variant="body1">
                email@address
            </Typography>
          </Box>

          <Box mb="40px">
            <Typography variant="body1">
                0123 456 789
            </Typography>
          </Box>

          <Box display="inline" px="20px">
            <Button size="medium" variant="contained" type="submit" color="primary" style={{margin: "10px"}}>
              <Typography variant="button">Set Meeting</Typography>
            </Button>

            <Button size="medium" variant="contained" type="submit" color="primary">
              <Typography variant="button">Edit Details</Typography>
            </Button>
          </Box>
        
         
          
          <Box mt="40px">
            <Typography variant="h2" align="center">
              Meeting History
            </Typography>
          </Box>

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

        </Grid>

    </ThemeProvider>
)};

export default PeopleInfoPage;
