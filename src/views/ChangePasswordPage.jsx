import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import PageAppBar from "../components/PageAppBar"
import { makeStyles } from '@material-ui/core/styles';

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
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/Profile" tab="Profile" />

            <Grid container direction="column" justifyContent="center" style={{ minHeight: "90vh" }}>
                <Box className={classes.title}>
                    <Typography variant="h2">
                        Change Password
                    </Typography>
                </Box>
                <form>
                    <Box className={classes.form}>
                        <TextField label="Current Password" placeholder="Current Password" type="password" variant="filled" fullWidth required />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="New Password" placeholder="New Password" type="password" variant="filled" fullWidth />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Confirm New Password" placeholder="Confirm New Password" required type="password" variant="filled" fullWidth />
                    </Box>
                </form>

                <Box className={classes.update}>
                    <Button size="medium" type="submit" variant="outlined" color="secondary">
                        <Typography variant="button" color="secondary">Update</Typography>
                    </Button>
                </Box>


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
