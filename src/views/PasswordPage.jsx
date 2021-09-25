import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from '@material-ui/core/Link';

//general components in use
import PageAppBar from "../components/PageAppBar"

const PasswordPage = () => {

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/" />

            <Grid container direction="column" alignItems="center" justifyContent="center" >
                <Box marginTop="clamp(50px, 20%, 100px)">
                    <Typography variant="h2">
                        Change Password
                    </Typography>
                </Box>
                <form>
                    <Box marginTop="clamp(40px, 18%, 70px)" width="30%" minWidth="400px">
                        <TextField label="Current Password" placeholder="Current Password" required type="password" variant="filled" fullWidth required />
                    </Box>

                    <Box marginTop="clamp(40px, 18%, 70px)" width="30%" minWidth="400px">
                        <TextField label="New Password" placeholder="New Password" required type="password" type="password" variant="filled" fullWidth />
                    </Box>

                    <Box marginTop="clamp(40px, 18%, 70px)" width="30%" minWidth="400px">
                        <TextField label="Confirm New Password" placeholder="Confirm New Password" required type="password" variant="filled" fullWidth />
                    </Box>
                    <br />

                </form>

                <Box px="20px" marginTop="clamp(25px, 12%, 50px)">
                    <Link to="/HomePage" style={{ textDecoration: 'none' }}>
                        <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                            <Typography variant="button" color="secondary">Update</Typography>
                        </Button>
                    </Link>
                </Box>


                <Box marginTop="clamp(10px, 3%, 18px)" >
                    <Link href="#" style={{ fontSize: "25px", color: '#0353A4' }}>
                        Go Back
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default PasswordPage;