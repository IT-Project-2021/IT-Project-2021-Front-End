import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import PageAppBar from "../components/PageAppBar"

const palette = Theme.palette
const useStyles = makeStyles({
    title: {
      color: palette.primary.main,
      margin: "7vh 0vh 10vh",
    },
    form: {
        color: palette.primary.main,
        margin: "3vh 0vh 0vh 0vh",
        width: "10vh",
        minWidth: "400px",
    },
    update: {
        color: palette.primary.main,
        margin: "10vh 0vh 3vh"
    },
    changePasswordButton: {
        color: palette.primary.main,
        margin: "1vh 0vh 0vh",
    },
    delete: {
        color: palette.primary.main,
        margin: "0vh 0vh 1vh"
    },
    
});



const ProfilePage = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <PageAppBar prevPage="/HomePage" tab="Profile" />

            <Grid container direction="column" style={{ height: "90vh" }}>
                <Box className={classes.title} >
                    <Typography variant="h2">
                        Profile
                    </Typography>
                </Box>

                <form>
                    <Box className={classes.form}>
                        <TextField label="First Name" placeholder="John" variant="filled" fullWidth />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Last Name" placeholder="Doe" type="password" variant="filled" fullWidth />
                    </Box>
                    <br />

                </form>

                <Box className={classes.update}>
                    <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                        <Typography variant="button" color="secondary">Update</Typography>
                    </Button>
                </Box>

                <Box className={classes.changePasswordButton}>
                    <Link to="/ChangePassword" style={{ textDecoration: 'none' }}>
                        <Button size="medium" variant="outlined" color="secondary">
                            <Typography variant="button"> Change password </Typography>
                        </Button>
                    </Link>
                </Box>

                <Box className={classes.delete}>
                    <Link style={{ textDecoration: 'none', fontSize: "20px", color: '#0353A4' }}>
                        Delete Account
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default ProfilePage;
