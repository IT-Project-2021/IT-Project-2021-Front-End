
import Theme from "../themes/landingTheme";

//general components in use
import PageTitle from "../components/PageTitle"

import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';

import { Link } from "react-router-dom";

const palette = Theme.palette
const useStyles = makeStyles({
    loginButton: {
      color: palette.background.default,
      backgroundColor: palette.primary.main,
      width: "100%",
    },
    signupButton: {
      color: palette.background.default,
      backgroundColor: palette.secondary.main,
      width: "100%",
    },
});

const LoginButton = () => {
  const classes = useStyles();
  return (
    <Box mt="30px">
      <Link to="/HomePage" style={{ textDecoration: 'none' }}>
        <Button className = {classes.loginButton} variant="contained" type="submit" >
          <Typography variant="h2">Log In</Typography>
        </Button>
      </Link>
    </Box>
  )
}

const SignUpButton = () => {
  const classes = useStyles();
  return (
    <Box mt="30px">
       <Link to="/HomePage" style={{ textDecoration: 'none' }}>
        <Button className = {classes.signupButton} variant="contained" type="submit" >
          <Typography variant="h2">Sign Up</Typography>
        </Button>
        </Link>
    </Box>
  )
}

const LandingPage = () => {

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "90vh" }}>
      
        <PageTitle />
        <LoginButton />
        <SignUpButton />
      
      </Grid>
    </ThemeProvider>
)};

export default LandingPage;
