import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AddButton from "@material-ui/icons/Add"
import IconButton from '@material-ui/core/IconButton';
import PageAppBar from "../components/PageAppBar"
import peopleService from "../services/people"
import React, { useState, useEffect } from 'react'

const palette = Theme.palette
const useStyles = makeStyles({
    personButton: {
      color: palette.tertiary.main,
      justifyContent: "flex-start",
    },
    divider: {
        background: palette.secondary.main,
        variant: 'fullWidth',
    },
    personLink: {
        textDecoration: "none",
    },
    listedPerson: {
        textTransform: "none",
        padding: "22px 20px 15px 15px"
    },
    personList: {
        listStyleType: "none",
        padding: "0 10px 0 15px"
    },
    addButtonContainer: {
        position: "fixed", 
        bottom: 0,
        padding: "4em",
        width: "100%",
        justifyContent: "flex-end",
        display: "flex"
    },
    addButton: {
        fontSize: "100px",
        color: palette.tertiary.main,
        backgroundColor: palette.quarternary.main
    }
});

const PersonListItem = ({name, id}) => {
    const classes = useStyles();
    const detailsURL = "/PeopleInformation/" + id;
    return (
        <Box>
            <Link to={detailsURL} className={classes.personLink} >
                <Button className={classes.personButton} fullWidth={true}>
                    <Typography variant="h4" className={classes.listedPerson}> {name} </Typography>
                </Button>
            </Link>
            <Divider className={classes.divider} />
        </Box>
    )
}

const PeopleListPage = () => {

    // maintain list of people from the server
    const [peopleList, setPeopleList] = useState([])

    // retrieve the list of people
    useEffect(() => {
        peopleService
            .getAll()
            .then(response => {
                setPeopleList(response.data)
            })
            .catch(error => {
                console.log("Failed to retrieve list of people from the server:", error)
            })
    }, [])
    console.log("Number of people:", peopleList.length)
    console.log("People list:", peopleList)

    
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
        <CssBaseline />

            <PageAppBar prevPage="/HomePage" tab="People" type="Menu"/>


            <Grid container direction="column" style={{ minHeight: "80vh", padding: "20px 0 0 0"}}>
            <ul className={classes.personList}>
                {peopleList.map(item => 
                    <li key={item._id}>
                        <PersonListItem 
                            name={item.first_name + " " + item.last_name}
                            id={item._id} 
                        />
                    </li>
                )}
            </ul>
            </Grid>


            <Box className={classes.addButtonContainer} >
                <Link to="/AddNewPerson">
                    <IconButton aria-label="add" className={classes.addButton} >
                        <AddButton fontSize="large"/>
                    </IconButton>
                </Link>
            </Box>

        </ThemeProvider>
    )
}

export default PeopleListPage