
import Theme from "../themes/landingTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

const LandingPage = () => {
  // const url = "http://localhost:3000/LandingPage";

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Box mt="230px" mb="140px" bgcolor="primary">
        <Typography variant="h1" align="center" color="primary">
          My Daily
        </Typography>
        <Typography variant="h1" align="center" color="primary">
          Planner
        </Typography>
      </Box>

      <Box mt="20px">
        <Button size="medium" variant="contained" color="primary" type="submit">
          <Typography variant="h2">Log In</Typography>
        </Button>
      </Box>

      <Box mt="20px">
        <Button size="medium" variant="contained" color="secondary" type="submit">
          <Typography variant="h2">Sign Up</Typography>
        </Button>
      </Box>
        


    </ThemeProvider>
)};

export default LandingPage;
