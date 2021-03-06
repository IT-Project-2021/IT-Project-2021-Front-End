import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import PageAppBar from "../components/PageAppBar"
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import authService from "../services/auth"
import Cookies from 'universal-cookie'

const palette = Theme.palette
const useStyles = makeStyles({
  loginTitle: {
    margin: "10vh 0vh 15vh",
  },
  form: {
    margin: "3vh 0vh 0vh",
    width: "30vh",
    minWidth: "400px",
  },
  loginButton: {
    fontSize: "medium",
    backgroundColor: palette.quarternary.main,
    margin: "5vh 0vh 0vh",
    minWidth: "10vh"
  },
});

const LoginPage = () => {

  // redirect away from this page if the user is already logged in
  const cookies = new Cookies();
  if (cookies.get("token")) {
    window.location.href = "/HomePage"
  }

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = () => {
    const data = {
      email: email,
      password: pass
    }

    authService
      .attemptLogin(data)
      .then(response => {
        const cookies = new Cookies();
        cookies.set('token', response.data.token, {path: '/'})
        window.location.href = "/HomePage"
      })
      .catch(err => {
        if (err.response.data.errorMessage) {
          alert(err.response.data.errorMessage + " Please try again!")
        } else {
          alert("Something went wrong logging in. Please reload the page and try again!")
        }
        
      })
  }

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar tab="Login" type="Back" />

      <Grid container direction="column" alignItems="center" style={{ minHeight: "90vh" }}>
        <Box className={classes.loginTitle}>
          <Typography variant="h2">
            Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box className={classes.form} >
            <TextField label="Email" placeholder="Email" required variant="filled" fullWidth onChange={(e) => { setEmail(e.target.value); }} />
          </Box>

          <Box className={classes.form} >
            <TextField label="Password" placeholder="Password" required type="password" variant="filled" fullWidth onChange={(e) => { setPass(e.target.value); }} />
          </Box>
          <br />
          <Box>
              <Button className={classes.loginButton} size="medium" onClick={handleSubmit} >
                <Typography variant="button">Login</Typography>
              </Button>
          </Box>
        </form>


        {/* <Box className={classes.forgotPassword} >
          <Link to="/SignUp" style={{ textDecoration: 'none', fontSize: "16px", color: '#0353A4' }}>
            Create an account
          </Link>
          <br></br>
          <Link to="/ForgotPassword" style={{ textDecoration: 'none', fontSize: "16px", color: '#0353A4' }}>
            Forgot your password?
          </Link>
        </Box> */}


      </Grid>
    </ThemeProvider>
  )
};

export default LoginPage;
