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
    title: {
      color: palette.primary.secondary,
      margin: "30% 10% 100px",
    },
    form: {
        color: palette.primary.main,
        margin: "60% 0px 0px 0px",
        width: "30%",
        minWidth: "400px",
    },
    reset: {
        color: palette.primary.main,
        margin: "7% 0px 7% 0px",
        width: "50%",
        minWidth: "400px"
    },
})

const ForgotPasswordPage = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/Login" tab="Login" />

            <Grid container direction="column" alignItems="center" style={{ minHeight: "60vh" }}>
                
                <Box className={classes.title}>
                    <Typography variant="h2">
                        Forgot your password?
                    </Typography>

                    <br/>

                    <Typography variant="h5">
                        Tell us your email, and we'll send you instructions to reset your password
                    </Typography>
                </Box>

            

                <form>
                    <Box className={classes.form}>
                        <TextField label="Email" placeholder="Email" required variant="filled" fullWidth />
                    </Box>
                    <br />

                </form>

                <Box className={classes.reset}>
                    <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                        <Typography variant="button" color="secondary">Reset Password</Typography>
                    </Button>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default ForgotPasswordPage;
