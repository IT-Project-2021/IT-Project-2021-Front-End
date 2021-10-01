import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import AddButton from "@material-ui/icons/Add"
import IconButton from '@material-ui/core/IconButton';
import meetingService from "../services/meetings";
import React, { useState, useEffect } from 'react'

//general components in use
import PageAppBar from "../components/PageAppBar"

const palette = Theme.palette
const useStyles = makeStyles({
    meetingButton: {
      color: palette.tertiary.main,
      justifyContent: "flex-start",
    },
    divider: {
        background: palette.quarternary.main,
        variant: 'fullWidth',
    },
    meetingLink: {
        textDecoration: "none",
    },
    listedMeeting: {
        textTransform: "none",
        padding: "22px 20px 15px 15px"
    },
    meetingList: {
        listStyleType: "none",
        padding: "0 10px 0 15px"
    },
    addButtonContainer: {
        position: "fixed", 
        bottom: 0,
        width: "100%",
        justifyContent: "flex-end",
        display: "flex",
        padding: "4em",
    },
    addButton: {
        fontSize: "large",
        color: palette.tertiary.main,
        backgroundColor: palette.quarternary.main
    },
    leftText: {
        textAlign: "left",
        padding: "30px 00px 0px 33px"
    },
});

const MeetingListItem = ({title}) => {
    const classes = useStyles();
    return (
        <Box>        
            <Button className={classes.meetingButton} fullWidth={true}>
                <Typography variant="h4" className={classes.listedMeeting}> {title} </Typography>
            </Button>
            <Divider className={classes.divider} />
        </Box>
    )
}

const MeetingsPage = () => {

    // maintain list of meetings from the server
    const [meetingList, setMeetingList] = useState([])

    // retrieve the list of meetings
    useEffect(() => {
        meetingService
            .getAll()
            .then(response => {
                setMeetingList(response.data)
            })
            .catch(error => {
                console.log("Failed to retrieve list of meetings from the server:", error)
            })
    }, [])

    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
        <CssBaseline />

            <PageAppBar prevPage="/HomePage" tab="Meetings"/>

            <Typography variant="h2" className={classes.leftText} >Upcoming</Typography>


            {/* List of future meetings  */}
            <Grid container direction="column" style={{ padding: "20px 0 0 0"}}>
            <ul className={classes.meetingList}>

                {meetingList.map(item => 
                    <li key={item._id}>
                        <MeetingListItem 
                            title={item.title}
                        />
                    </li>
                )}
            </ul>
            </Grid>


            <Typography variant="h2" className={classes.leftText} >Past Meetings</Typography>

            {/* List of past meetings */}
            <Grid container direction="column" style={{ padding: "20px 0 0 0"}}>
            <ul className={classes.meetingList}>

                {meetingList.map(item => 
                    <li key={item._id}>
                        <MeetingListItem 
                            title={item.title}
                        />
                    </li>
                )}
            </ul>
            </Grid>

            <Box className={classes.addButtonContainer} >
                <IconButton aria-label="add" className={classes.addButton} >
                    <AddButton fontSize="large"/>
                </IconButton>
            </Box>

        </ThemeProvider>
    )
}

export default MeetingsPage