import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";

//general components in use
import PageAppBar from "../components/PageAppBar"

const LoginPage = () => {

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      <PageAppBar prevPage="/" />

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
          <br/>
          
          </form>

        <Box px="20px" marginTop="clamp(25px, 12%, 50px)">
          <Link to="/HomePage" style={{ textDecoration: 'none' }}>
            <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
              <Typography variant="button" color="secondary">Login</Typography>
            </Button>
          </Link>
        </Box>
        

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
