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
      margin: "20% 20% 100px",
    },
    form: {
        color: palette.primary.main,
        margin: "20% 0px 0px 0px",
        width: "30%",
        minWidth: "400px",
    },
    update: {
        color: palette.primary.main,
        margin: "60% 0px 10px 0px",
        width: "50%",
        minWidth: "400px"
    },
})

const ChangePasswordPage = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/Profile" />

            <Grid container direction="column" alignItems="center" justifyContent="center" >
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
                    <br />

                </form>

                <Box className={classes.update}>
                    <Button size="medium" type="submit" variant="outlined" color="secondary">
                        <Typography variant="button" color="secondary">Update</Typography>
                    </Button>
                </Box>


                <Box>
                    <Link to="/Profile" style={{ textDecoration: 'none', fontSize: "25px", color: '#0353A4' }}>
                        Go Back
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default ChangePasswordPage;