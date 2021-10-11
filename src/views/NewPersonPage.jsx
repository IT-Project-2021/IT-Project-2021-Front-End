import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import PageAppBar from "../components/PageAppBar"
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";

const palette = Theme.palette
const useStyles = makeStyles({
    title: {
        color: palette.primary.main,
        margin: "5vh 0vh 15vh",
    },
    confirm: {
        color: palette.secondary.main,
        margin: "10vh 0vh 2vh",
    },
    form: {
        color: palette.secondary.main,
        margin: "3vh 0vh 0vh 0vh",
        width: "40vh"
    },
})

const NewPersonPage = () => {
    const classes = useStyles();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [notes, setNotes] = useState("");
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/People" tab="People" type="Back"/>

            <Grid container direction="column" justifyContent="center" style={{ minHeight: "90vh" }}>
                <Box className={classes.title}>
                    <Typography variant="h2">
                        New Person
                    </Typography>
                </Box>

                <form>
                    <Box>
                        <Box component="span" margin="5px">
                            <TextField label="First Name" placeholder="First Name" required variant="filled" onChange={(e) => { setFirst(e.target.value); }} />
                        </Box>
                        <Box component="span" margin="5px">
                            <TextField label="Last Name" placeholder="Last Name" required variant="filled" onChange={(e) => { setLast(e.target.value); }} />
                        </Box>
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Company" placeholder="Company" variant="filled" onChange={(e) => { setCompany(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Position" placeholder="Position" variant="filled" onChange={(e) => { setPosition(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Email" placeholder="Email" variant="filled" onChange={(e) => { setEmail(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Phone number" placeholder="Phone number" type="number" variant="filled" onChange={(e) => { setPhone(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Optional Notes" multiline rows={4} placeholder="Optional Notes" variant="filled" onChange={(e) => { setNotes(e.target.value); }} />
                    </Box>

                    <Box className={classes.confirm}>
                        <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                            <Typography>Confirm</Typography>
                        </Button>
                    </Box>
                </form>

            </Grid>
        </ThemeProvider>
    )
};

export default NewPersonPage;
