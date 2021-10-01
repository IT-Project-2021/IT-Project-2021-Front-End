import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import PageAppBar from "../components/PageAppBar"
import { makeStyles } from '@material-ui/core/styles';

const palette = Theme.palette
const useStyles = makeStyles({
  loginTitle: {
    marginBottom: "15vh",
  },
  form: {
    marginBottom: "3vh",
    width: "40vh"
  },
  forgotPassword: {
    marginBottom: "15vh",
  },
});

const LoginPage = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar prevPage="/" tab="Login" />

      <Grid container direction="column" alignItems="center" justifyContent="center" style={{minHeight: "90vh"}}>
        <Box className={classes.loginTitle}>
          <Typography variant="h2">
            Login
          </Typography>
        </Box>
        <form>
          <Box className={classes.form} >
            <TextField label="Email" placeholder="Email" required variant="filled" />
          </Box>

          <Box className={classes.form} >
            <TextField label="Password" placeholder="Password" required type="password" variant="filled" />
          </Box>
          <br/>
          
          </form>

        <Box className={classes.forgotPassword}>
          <Link to="/HomePage" style={{ textDecoration: 'none' }}>
            <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
              <Typography variant="button" color="secondary">Login</Typography>
            </Button>
          </Link>
        </Box>
        

        <Box marginTop="clamp(10px, 3%, 18px)" >
          <Link to="/ForgotPassword" style={{ textDecoration: 'none', fontSize: "16px", color: '#0353A4' }}>
            Forgot your password?
          </Link>
        </Box>

      </Grid>
    </ThemeProvider>
  )
};

export default LoginPage;
