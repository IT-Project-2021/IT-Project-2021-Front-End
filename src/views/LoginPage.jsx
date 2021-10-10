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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = {
        email: email,
        password_hash: pass,
      };

      await axios.post("/api/auth/login", data, {
        withCredentials: true,
      })

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar prevPage="/" tab="Login" />

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
            <Link to="/HomePage" style={{ textDecoration: 'none' }}>
              <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                <Typography variant="button" color="secondary">Login</Typography>
              </Button>
            </Link>
          </Box>

        </form>


        <Box className={classes.forgotPassword} >
          <Link to="/ForgotPassword" style={{ textDecoration: 'none', fontSize: "16px", color: '#0353A4' }}>
            Forgot your password?
          </Link>
        </Box>

      </Grid>
    </ThemeProvider>
  )
};

export default LoginPage;
