import Theme from "../themes/landingTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button,Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from '@material-ui/core/Divider';
const HomePage = () => {

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{minHeight: "90vh"}}>
                <Box>
                    <Typography variant="h1" align="center" color="primary">
                        My Daily
                    </Typography>
                    <Typography variant="h1" align="center" color="primary">
                        Planner
                    </Typography>
                </Box>

                <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
                    <Button fullWidth={true} size="large" style={{ height: "98%", justifyContent: "flex-start" }}>
                        <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>People</Typography>
                    </Button>
                    <Divider style={{ background: "white" }} />
                </Box>

                <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
                    <Button fullWidth={true} size="large" style={{ height: "98%", justifyContent: "flex-start" }}>
                        <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>Meetings</Typography>
                    </Button>
                    <Divider style={{ background: "white" }} />
                </Box>

                <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
                    <Button fullWidth={true} size="large" style={{ height: "98%", justifyContent: "flex-start" }}>
                        <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>Reminders</Typography>
                    </Button>
                    <Divider style={{ background: "white" }} />
                </Box>

                <Box mt="2px" width={.99} bgcolor="primary" height="60px" position="fixed" bottom="0">
                    <Button size="large" style={{ height: "100%", justifyContent: "flex-start", width: "50%" }}>
                        <Typography variant="h6" style={{ color: "white" }}>Settings</Typography>
                    </Button>
                    <Button size="large" style={{ height: "100%", justifyContent: "flex-end", width: "50%" }}>
                        <Typography variant="h6" style={{ color: "white" }}>Logout</Typography>
                    </Button>
                </Box>
            </Grid>
        </ThemeProvider>
    )
};


export default HomePage