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
    title: {
        color: palette.primary.secondary,
        margin: "10vh 0vh 0vh",
    },
    subtitle: {
        color: palette.primary.secondary,
        margin: "3vh",
    },
    form: {
        color: palette.primary.main,
        margin: "10vh 0vh 0vh",
        width: "30vh",
        minWidth: "400px",
    },
    reset: {
        color: palette.primary.main,
        margin: "7vh 0vh 7vh 0vh",
        width: "50vh",
        minWidth: "400px"
    },
})

const ForgotPasswordPage = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <PageAppBar prevPage="/Login" tab="Login" />
            <Grid container direction="column" alignItems="center" style={{ minHeight: "90vh" }}>
                <Box >
                    <Typography className={classes.title} variant="h2">
                        Forgot your password?
                    </Typography>

                    <Typography className={classes.subtitle} variant="h5">
                        Tell us your email, and we'll send you instructions to reset your password
                    </Typography>
                </Box>

                <form>
                    <Box className={classes.form}>
                        <TextField label="Email" placeholder="Email" required variant="filled" fullWidth onChange={(e) => { setEmail(e.target.value); }} />
                    </Box>
                    <br />
                    <Box className={classes.reset}>
                        <Button size="large" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                            <Typography variant="button" color="secondary">Reset Password</Typography>
                        </Button>
                    </Box>
                </form>

            </Grid>
        </ThemeProvider>
    )
};

export default ForgotPasswordPage;
