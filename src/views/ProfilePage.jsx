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
      margin: "10% 20% 10%",
    },
    update: {
        color: palette.primary.main,
        margin: "10% 10% 100px",
        width: "50%"
    },
    changePasswordButton: {
        color: palette.primary.main,
        margin: "10% 10% 0px 100px",
    },
    delete: {
        color: palette.primary.main,
        margin: "10px 10% 100px",
    },
    form: {
        color: palette.primary.main,
        margin: "10% 0px 0px 0px",
        width: "30%",
        minWidth: "400px",
    }
});



const ProfilePage = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <PageAppBar prevPage="/HomePage" tab="Profile" />

            <Grid container direction="column" alignItems="center" justifyContent="center" >
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
                    <Link href="#" style={{ textDecoration: 'none', fontSize: "25px", color: '#0353A4' }}>
                        Delete Account
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default ProfilePage;
