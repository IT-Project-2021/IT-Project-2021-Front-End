import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar"
import userService from "../services/users"
import Cookies from 'universal-cookie'
import React, { useState, useEffect } from 'react'

const palette = Theme.palette
const useStyles = makeStyles({
    title: {
      color: palette.secondary.main,
      margin: "12vh 0vh 10vh",
    },
    form: {
        color: palette.primary.main,
        margin: "3vh 0vh 0vh 0vh",
    },
    update: {
        color: palette.primary.main,
        margin: "3vh 0vh 10vh",
    },
    changePasswordButton: {
        color: palette.primary.main,
        margin: "1vh 0vh 0vh",
    },
    updateButton: {
        fontSize: "medium",
        color: palette.tertiary.main,
        backgroundColor: palette.quarternary.main
    },
    delete: {
        color: palette.secondary.main,
        margin: "1vh 0vh 1vh"
    },
    
});



const ProfilePage = () => {

    // Load user info from backend
    const [userInfo, setUserInfo] = useState({})
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [pageTitle, setPageTitle] = useState("Profile") // the contact's original name, displayed at page top
    useEffect(() => {
        const cookies = new Cookies()
        userService
            .getInfo(cookies.get("token"))
            .then(response => {
                setUserInfo(response.data)
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setPageTitle(response.data.first_name + " " + response.data.last_name + "'s Profile")
            })
    }, [])

    // submit updated information
    const submitChanges = () => {
        const newInfo = {
            first_name: firstName,
            last_name: lastName
        }
        const cookies = new Cookies()
        userService
            .updateUser(userInfo._id, newInfo, cookies.get("token"))
            .then(response => {
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
    }

    // Delete an account
    const deleteAccount = () => {

        const cookies = new Cookies()
        userService
            .remove(userInfo._id, cookies.get("token"))
            .then(response => {
                // remove the token from the browser - this user doesn't exist anymore
                cookies.remove("token", {path: '/'})
                window.location.href = "/"
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
    }

    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <PageAppBar tab="Profile" type="Back"/>

            <Grid container direction="column" style={{ minHeight: "90vh" }}>
                <Box className={classes.title} >
                    <Typography variant="h2">
                        {pageTitle}
                    </Typography>
                </Box>

                <form>
                    <Box className={classes.form}>
                        <TextField label="First Name" placeholder={firstName} variant="filled" value={firstName} onChange={(e) => { setFirstName(e.target.value); }}/>
                    </Box>
                    <Box className={classes.form}>
                        <TextField label="Last Name" placeholder={lastName} variant="filled" value={lastName} onChange={(e) => { setLastName(e.target.value); }}/>
                    </Box>
                </form>

                <Box className={classes.update}>
                    <Button className={classes.updateButton} type="submit" variant="filled" onClick={submitChanges}>
                        <Typography variant="button">Update</Typography>
                    </Button>
                </Box>

                <Box className={classes.changePasswordButton}>
                    <Link to="/ChangePassword" style={{ textDecoration: 'none' }}>
                        <Button size="small" variant="outlined" color="secondary">
                            <Typography variant="button"> Change password </Typography>
                        </Button>
                    </Link>
                </Box>

                <Box className={classes.delete}>
                    <Link style={{ textDecoration: 'none', color: '#0353A4' }} onClick={deleteAccount}>
                        Delete Account
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default ProfilePage;
