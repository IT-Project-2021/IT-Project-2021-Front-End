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
      margin: "0px 0px 20%",
    },
    confirm: {
        color: palette.secondary.main,
        margin: "20% 0px 0px",
    },
    form: {
        color: palette.secondary.main,
        margin: "10%",
        width: "65%",
        minWidth: "260px"
    },
})

const NewPersonPage = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/" tab="People" />

            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "90vh" }}>
                <Box className={classes.title}>
                    <Typography variant="h2">
                        New Person
                    </Typography>
                </Box>
                <form>
                    <Box width="60%" minWidth="260px" component="span">
                        <TextField label="First Name" placeholder="First Name" required variant="filled" display="inline" />
                        <Box component="span" margin="10px"></Box>
                        <TextField label="Last Name" placeholder="Last Name" required variant="filled" display="inline" />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Company" placeholder="Company" variant="filled" fullWidth />
                    </Box>
                    <Box className={classes.form}>
                        <TextField label="Position" placeholder="Position" variant="filled" fullWidth />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Email" placeholder="Email" variant="filled" fullWidth />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="Phone number" placeholder="Phone number" type="number" variant="filled" fullWidth />
                    </Box>

                    <Box className={classes.form}>
                        <TextField label="optional notes" placeholder="optional notes" variant="filled" fullWidth />
                    </Box>
                    <br />

                </form>

                <Box className={classes.confirm}>
                    <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                        <Typography>Confirm</Typography>
                    </Button>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default NewPersonPage;
