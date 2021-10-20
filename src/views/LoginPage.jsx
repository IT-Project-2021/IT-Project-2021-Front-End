import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import PageAppBar from "../components/PageAppBar"
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from "react";
import axios from "axios";
import Logged from "../auth/Logged";
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
    color: palette.primary.main,
    margin: "10vh 0vh 0vh",
    width: "50vh",
    minWidth: "400px"
  },
  forgotPassword: {
    margin: "2vh 0vh",
  },
});

const LoginPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { getLoggedIn } = useContext(Logged);


  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("this function is being called")

  //   try {
  //     const data = {
  //       email: email,
  //       password_hash: pass,
  //     };

  //     console.log("Data in form:", data)

  //     await axios.post("/api/auth/login", data);
  //     await getLoggedIn();
  //   } catch (err) {
  //     console.log("there was an error:", err)
  //     console.error(err);
  //   }
  // }

  const handleSubmit = () => {
    console.log("this function is being called")
    const data = {
      email: email,
      password: pass
    }

    console.log("Data in form:", data)
    authService
      .attemptLogin(data)
      .then(response => {
        console.log("RESPONSE DATA:", response.data)
        const cookies = new Cookies();
        cookies.set('token', response.data.token, {path: '/'})
        console.log("Just set cookie:", cookies.get("token"))
        window.location.href = "/HomePage"
      })
      .catch(err => {
        console.log("ERROR:", err)
        console.log("data:", err.response)
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

      <PageAppBar prevPage="/" tab="Login" type="Back" />

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
          <Box className={classes.loginButton}>
            {/* <Link to="/HomePage" style={{ textDecoration: 'none' }}> */}
              <Button size="medium" onClick={handleSubmit} color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                <Typography variant="button" color="secondary">Login</Typography>
              </Button>
            {/* </Link> */}
          </Box>

        </form>


        <Box className={classes.forgotPassword} >
          <Link to="/SignUp" style={{ textDecoration: 'none', fontSize: "16px", color: '#0353A4' }}>
            Create an account
          </Link>
          <br></br>
          <Link to="/ForgotPassword" style={{ textDecoration: 'none', fontSize: "16px", color: '#0353A4' }}>
            Forgot your password?
          </Link>
        </Box>

      </Grid>
    </ThemeProvider>
  )
};

export default LoginPage;
