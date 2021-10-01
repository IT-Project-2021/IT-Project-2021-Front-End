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
      color: palette.secondary.main,
      margin: "7vh 0vh 10vh",
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
    delete: {
        color: palette.secondary.main,
        margin: "1vh 0vh 1vh"
    },
    
});



const ProfilePage = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <PageAppBar prevPage="/HomePage" tab="Profile" />

            <Grid container direction="column" style={{ minHeight: "90vh" }}>
                <Box className={classes.title} >
                    <Typography variant="h2">
                        Profile
                    </Typography>
                </Box>

                <form>
                    <Box className={classes.form}>
                        <TextField label="First Name" placeholder="John" variant="filled" />
                    </Box>
                    <Box className={classes.form}>
                        <TextField label="Last Name" placeholder="Doe" type="password" variant="filled" />
                    </Box>
                </form>

                <Box className={classes.update}>
                    <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
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
                    <Link style={{ textDecoration: 'none', color: '#0353A4' }}>
                        Delete Account
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default ProfilePage;
