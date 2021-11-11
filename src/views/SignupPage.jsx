import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar"
import axios from "axios";
import React, { useState } from "react";
import Cookies from 'universal-cookie'


const palette = Theme.palette
const useStyles = makeStyles({
    title: {
        color: palette.primary.main,
        margin: "7vh 0vh 15vh",
    },
    form: {
        color: palette.primary.main,
        margin: "3vh 0vh 0vh",
        width: "30vh",
        minWidth: "400px",
    },
    signup: {
        color: palette.primary.main,
        margin: "10vh 0vh 10vh 0vh",
        width: "50vh",
    },
    signUpButton: {
        fontSize: "medium",
        backgroundColor: palette.quarternary.main,
        margin: "10vh 0vh 0vh",
        minWidth: "10vh"
    },
})


const SignupPage = () => {

    // redirect away from this page if the user is already logged in
    const cookies = new Cookies();
    if (cookies.get("token")) {
        window.location.href = "/HomePage"
    }

    const classes = useStyles();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passwordError, setPassError] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();
        setPassError(false);
        if (pass !== confirm) {
            setPassError(true);
            alert("Passwords do not match.")
        } else {
            try {
                const data = {
                    first_name: first,
                    last_name: last,
                    email: email,
                    password: pass,
                };
                const res = await axios.post("https://it-project-2021-back-end.herokuapp.com/api/users",
                    data
                );
                console.log("response:", res.data)
                window.location.href = "/Login"
    
            } catch (err) {
                console.log(err.response.data)
                alert(err.response.data.errorMessage)
            }
        }
        
    }

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar tab="" type="Back"/>

            <Grid container direction="column" alignItems="center" style={{ minHeight: "90vh" }}>
                <Box className={classes.title}>
                    <Typography variant="h2">
                        Signup
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box width="60%" minWidth="260px" component="span">
                        <TextField label="First Name" placeholder="First Name" required variant="filled" display="inline" onChange={(e) => { setFirst(e.target.value); }} />
                        <Box component="span" margin="10px"></Box>
                        <TextField label="Last Name" placeholder="Last Name" required variant="filled" display="inline" onChange={(e) => { setLast(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Email" placeholder="Email" required variant="filled" fullWidth onChange={(e) => { setEmail(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Password" placeholder="Password" required type="password" variant="filled" fullWidth onChange={(e) => { setPass(e.target.value); }} error={passwordError} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Confirm Password" placeholder="Password" required type="password" variant="filled" fullWidth onChange={(e) => { setConfirm(e.target.value); }} error={passwordError} />
                    </Box>

                    <Box>
                          <Button className={classes.signUpButton} size="medium" type="submit">
                              <Typography variant="button" >Sign up</Typography>
                          </Button>
                    </Box>

                </form>



            </Grid>
        </ThemeProvider>
    )
};

export default SignupPage;
