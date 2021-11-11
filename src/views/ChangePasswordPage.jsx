import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import PageAppBar from "../components/PageAppBar"
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import userService from "../services/users";
import authService from "../services/auth";
import Cookies from 'universal-cookie'

const palette = Theme.palette
const useStyles = makeStyles({
    title: {
        color: palette.primary.main,
        margin: "10vh 0vh 10vh",
    },
    form: {
        color: palette.primary.main,
        margin: "3vh 0vh 0vh",
        width: "30vh",
        minWidth: "400px",
    },
    update: {
        color: palette.primary.main,
        margin: "15vh 0vh 0vh",
        minWidth: "400px"
    },
    goBackButton: {
        margin: "2vh 0vh",
    },
})

const ChangePasswordPage = () => {
    const classes = useStyles();
    const [current, setCurrent] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passwordError, setPassError] = useState(false);
    const [userInfo, setUserInfo] = useState({})

    // Get current user info
    useEffect(() => {
        const cookies = new Cookies()
        userService
            .getInfo(cookies.get("token"))
            .then(response => {
                setUserInfo(response.data)
                console.log("information:", response.data)
            })
            .catch(error => {
                // 401 error occurs if token is either missing or bad
                if (error.response && error.response.status && (error.response.status === 401)) {
                    if (cookies.get("token")) {
                        // The token is invalid
                        cookies.remove("token", { path: '/' }) 
                    }
                    window.location.href = "/login"
                }
            })
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setPassError(false);
        if (newPass !== confirm) {
            setPassError(true);
            alert("Passwords do not match. Please try again!")
        }
        else {
            const newData = {
                password: newPass,
            };
            const oldData = {
                password: current,
                email: userInfo.email
            }
            const cookies = new Cookies()
            // attempt authentication to confirm that cur pass is correct
            authService
                .attemptLogin(oldData)
                .then(response => {
                    console.log("Auth attempt succeeded:", response.data)
                    // Now that cur pass is confirmed, update password
                    userService
                        .updateUser(userInfo._id, newData, cookies.get("token"))
                        .then(response => {
                            console.log("Updated user:", response.data)
                            window.location.href = "/Profile"
                        })
                        .catch(error => {
                            // 401 error occurs if token is either missing or bad
                            if (error.response && error.response.status && (error.response.status === 401)) {
                                if (cookies.get("token")) {
                                    // The token is invalid
                                    cookies.remove("token", { path: '/' }) 
                                }
                                window.location.href = "/login"
                            }
                        })
                })
                .catch(error => {
                    console.log("Auth failed:", error.response)
                    alert("Current password is incorrect. Please try again!")
                })
        }
    }

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar tab="Profile" type="Back" />

            <Grid container direction="column" justifyContent="center" style={{ minHeight: "90vh" }}>
                <Box className={classes.title}>
                    <Typography variant="h2">
                        Change Password
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box className={classes.form}>
                        <TextField label="Current Password" placeholder="Current Password" type="password" variant="filled" fullWidth required onChange={(e) => { setCurrent(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="New Password" placeholder="New Password" type="password" variant="filled" fullWidth required onChange={(e) => { setNewPass(e.target.value); }} error={passwordError} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Confirm New Password" placeholder="Confirm New Password" required type="password" variant="filled" fullWidth onChange={(e) => { setConfirm(e.target.value); }} error={passwordError} />
                    </Box>

                    <Box className={classes.update}>
                        <Button size="medium" type="submit" variant="outlined" color="secondary">
                            <Typography variant="button" color="secondary">Update</Typography>
                        </Button>
                    </Box>
                </form>




                <Box className={classes.goBackButton}>
                    <Link to="/Profile" style={{ textDecoration: 'none', color: '#0353A4' }}>
                        Go Back
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default ChangePasswordPage;
