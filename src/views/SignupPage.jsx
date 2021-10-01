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
        minWidth: "400px"
    },
})

const SignupPage = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/" tab="" />

            <Grid container direction="column" alignItems="center" style={{ minHeight: "90vh" }}>
                <Box className={classes.title}>
                    <Typography variant="h2">
                        Signup
                    </Typography>
                </Box>
                <form>
                    <Box width="60%" minWidth="260px" component="span">
                        <TextField label="First Name" placeholder="First Name" required variant="filled" display="inline" />
                        <Box component="span" margin="10px"></Box>
                        <TextField label="Last Name" placeholder="Last Name" required variant="filled" display="inline" />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Email" placeholder="Email" required variant="filled" fullWidth />
                    </Box>
                    
                    <Box className={classes.form}>
                        <TextField label="Password" placeholder="Password" required type="password" variant="filled" fullWidth />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Confirm Password" placeholder="Password" required type="password" variant="filled" fullWidth />
                    </Box>
                    <br />

                </form>

                <Box className={classes.signup}>
                    <Link to="/HomePage" style={{ textDecoration: 'none' }} >
                        <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                            <Typography variant="button" color="secondary">Sign up</Typography>
                        </Button>
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default SignupPage;
