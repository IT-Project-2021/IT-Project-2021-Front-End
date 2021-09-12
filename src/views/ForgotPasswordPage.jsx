import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from '@material-ui/core/Link';

//general components in use
import PageAppBar from "../components/PageAppBar"

const ForgotPasswordPage = () => {

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/" tab="Back" />

            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "90vh" }}>
                <Box marginTop="clamp(120px, 12%, 300px)">
                    <Typography variant="h2">
                        Forgot your password?
                    </Typography>
                </Box>

                <Box marginTop="clamp(40px, 12%, 70px)">
                    <Typography variant="h5">
                        Enter the email used
                    </Typography>
                </Box>
                <form>
                    <Box marginTop="clamp(25px, 12%, 50px)" width="30%" minWidth="260px">
                        <TextField label="Email" placeholder="Email" required variant="filled" fullWidth />
                    </Box>
                    <br />

                </form>

                <Box px="20px" marginTop="clamp(40px, 12%, 70px)">
                    <Link to="/HomePage" style={{ textDecoration: 'none' }}>
                        <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                            <Typography variant="button" color="secondary">Reset Password</Typography>
                        </Button>
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default ForgotPasswordPage;
