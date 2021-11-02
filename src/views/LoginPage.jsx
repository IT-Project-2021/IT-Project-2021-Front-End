import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import PageAppBar from "../components/PageAppBar"
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";

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
    margin: "10vh 0vh 0vh",
    minWidth: "10vh"
  },
  forgotPassword: {
    margin: "2vh 0vh",
  },
});

const LoginPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

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

        <form>
          <Box className={classes.form} >
            <TextField label="Email" placeholder="Email" required variant="filled" fullWidth onChange={(e) => { setEmail(e.target.value); }} />
          </Box>

          <Box className={classes.form} >
            <TextField label="Password" placeholder="Password" required type="password" variant="filled" fullWidth onChange={(e) => { setPass(e.target.value); }} />
          </Box>
          <br />
          <Box>
            <Link to="/HomePage" style={{ textDecoration: 'none' }}>
              <Button className={classes.loginButton} size="medium" type="submit">
                <Typography variant="button">Login</Typography>
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
