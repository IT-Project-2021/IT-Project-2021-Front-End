
import Theme from "../themes/registrationTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';

const LoginPage = () => {

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <AppBar position="static" color="secondary" align="left" >
          <Box ml="50px" my="20px">
            <Typography variant="h6">
              Login
            </Typography>
          </Box>
      </AppBar>

      <Grid container direction="column" alignItems="center" justifyContent="center" style={{minHeight: "90vh"}}>
        <Box marginTop="clamp(120px, 12%, 300px)">
          <Typography variant="h2">
            Login
          </Typography>
        </Box>
        <form>
          <Box marginTop="clamp(25px, 12%, 50px)" width="30%" minWidth="260px">
            <TextField label="Email" placeholder="Email" required variant="filled" fullWidth />
          </Box>

          <Box marginTop="clamp(25px, 12%, 50px)" width="30%" minWidth="260px">
            <TextField label="Password" placeholder="Password" required type="password" variant="filled" fullWidth />
          </Box>

          <Box px="20px" marginTop="clamp(25px, 12%, 50px)">
            <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
              <Typography variant="button" color="primary">Login</Typography>
            </Button>
          </Box>
        </form>

        <Box marginTop="clamp(10px, 3%, 18px)" >
          <Link href="#" style={{ fontSize: "16px", color: '#0353A4' }}>
            Forgot your password?
          </Link>
        </Box>

      </Grid>
    </ThemeProvider>
  )
};

export default LoginPage;
