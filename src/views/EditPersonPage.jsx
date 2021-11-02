import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import PageAppBar from "../components/PageAppBar"
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react'
import peopleService from '../services/people'
import { useParams } from "react-router-dom"

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
    confirmButton: {
        color: palette.secondary.main,
        backgroundColor: palette.quarternary.main,
    },
    form: {
        color: palette.secondary.main,
        margin: "3vh 0vh 0vh 0vh",
        width: "40vh"
    },
})

const EditPersonPage = () => {

    // Page will display dummy info before it has loaded properly
    const dummyInfo = {
        first_name: "",
        last_name: "",
        email: "",
        phone_num: "",
    }

    // info to load from backend
    let { id } = useParams();
    const classes = useStyles();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [notes, setNotes] = useState("");
    const [contactInfo, setContactInfo] = useState(dummyInfo)
    const [pageTitle, setPageTitle] = useState("") // the contact's original name, displayed at page top

    useEffect(() => {
        peopleService
            .getByID(id)
            .then(response => {
                setContactInfo(response.data)
                console.log("Contact info recieved:", response.data)
                setFirst(response.data.first_name)
                setLast(response.data.last_name)
                setEmail(response.data.email)
                setCompany(response.data.company)
                setPhone(response.data.phone_num)
                setPosition(response.data.position)
                setNotes(response.data.notes)
                setPageTitle("Edit " + response.data.first_name + " " + response.data.last_name + "'s Details")
            })
            .catch(error => {
                console.log("Failed to retrieve person info from the server:", error)
            })
    }, [id])

    // update the contact
    const submitUpdate = () => {
        let editedContact = {
            first_name: first,
            last_name: last,
            email: email,
            company: company,
            phone_num: phone,
            position: position,
            notes: notes
        }

        peopleService
            .update(id, editedContact)
            .then(response => {
                console.log("UPDATED:", response.data)
                window.location.href = "/PeopleInformation/" + id
            })
            .catch(error => {
                console.log("Error submitting: ", error)
            })
    }

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/People" tab="People" type="Back" />

            <Grid container direction="column" justifyContent="center" style={{ minHeight: "90vh" }}>
                <Box className={classes.title}>
                    <Typography variant="h2">
                        {pageTitle}
                    </Typography>
                </Box>

                <form>
                    <Box>
                        <Box component="span" margin="5px">
                            <TextField
                                value={first} label="First Name" placeholder="First Name" required variant="filled" onChange={(e) => { setFirst(e.target.value); }}
                            />
                        </Box>
                        <Box component="span" margin="5px">
                            <TextField value={last} label="Last Name" placeholder="Last Name" required variant="filled" onChange={(e) => { setLast(e.target.value); }} />
                        </Box>
                    </Box>

                    <Box className={classes.form}>
                        <TextField value={company} label="Company" placeholder="Company" variant="filled" onChange={(e) => { setCompany(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField value={position} label="Position" placeholder="Position" variant="filled" onChange={(e) => { setPosition(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField value={email} label="Email" placeholder="Email" variant="filled" onChange={(e) => { setEmail(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField value={phone} label="Phone number" placeholder="Phone number" type="number" variant="filled" onChange={(e) => { setPhone(e.target.value); }} />
                    </Box>

                    <Box className={classes.form}>
                        <TextField value={notes} label="Optional Notes" multiline rows={4} placeholder="Optional Notes" variant="filled" onChange={(e) => { setNotes(e.target.value); }} />
                    </Box>

                    <Box className={classes.confirm}>
                        <Button onClick={submitUpdate} className={classes.confirmButton} variant="contained">
                            <Typography>Confirm</Typography>
                        </Button>
                    </Box>
                </form>

            </Grid>
        </ThemeProvider>
    )
};

export default EditPersonPage;
