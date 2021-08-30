
import Theme from "../theme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const PageA = props => <Link to="/a" {...props}/>

const LandingPage = () => {

  return (
    
    <ThemeProvider theme={Theme}>
      <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "90vh" }}>
      
        <Box>
          <Typography variant="h1" align="center" color="primary">
            My Daily
          </Typography>
          <Typography variant="h1" align="center" color="primary">
            Planner
          </Typography>
        </Box>

        <Box mt="20px">
          <Button size="medium" variant="contained" color="primary" type="submit" component={PageA}>
            <Typography variant="h2">Log In</Typography>
          </Button>
        </Box>

        <Box mt="20px">
          <Button size="medium" variant="contained" color="secondary" type="submit">
            <Typography variant="h2">Sign Up</Typography>
          </Button>
        </Box>
      
      </Grid>
    </ThemeProvider>
)};

export default LandingPage;
