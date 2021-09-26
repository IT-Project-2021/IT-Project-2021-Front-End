import Theme from "../themes/basicTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button, TextField, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from '@material-ui/core/Link';

//general components in use
import PageAppBar from "../components/PageAppBar"

const NewPersonPage = () => {

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <PageAppBar prevPage="/" tab="People" />

            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "90vh" }}>
                <Box marginTop="clamp(25px, 12%, 50px)" marginBottom="clamp(25px, 12%, 50px)">
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

                    <Box marginTop="clamp(25px, 12%, 50px)" width="65%" minWidth="260px">
                        <TextField label="Company" placeholder="Company" variant="filled" fullWidth />
                    </Box>
                    <Box marginTop="clamp(25px, 12%, 50px)" width="65%" minWidth="260px">
                        <TextField label="Position" placeholder="Position" variant="filled" fullWidth />
                    </Box>

                    <Box marginTop="clamp(25px, 12%, 50px)" width="65%" minWidth="260px">
                        <TextField label="Email" placeholder="Email" variant="filled" fullWidth />
                    </Box>

                    <Box marginTop="clamp(25px, 12%, 50px)" width="65%" minWidth="260px">
                        <TextField label="Phone number" placeholder="Phone number" type="number" variant="filled" fullWidth />
                    </Box>

                    <Box marginTop="clamp(25px, 12%, 50px)" width="65%" minWidth="260px">
                        <TextField label="optional notes" placeholder="optional notes" variant="filled" fullWidth />
                    </Box>
                    <br />

                </form>

                <Box px="20px" marginTop="clamp(25px, 12%, 50px)">
                    <Link to="/HomePage" style={{ textDecoration: 'none' }}>
                        <Button size="medium" type="submit" color="secondary" variant="outlined" style={{ border: '2px solid' }}>
                            <Typography variant="button" color="secondary">Confirm</Typography>
                        </Button>
                    </Link>
                </Box>

            </Grid>
        </ThemeProvider>
    )
};

export default NewPersonPage;
