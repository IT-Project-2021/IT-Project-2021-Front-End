import Theme from "../themes/landingTheme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
const MenuBar = () => {

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />

            <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
                <Button fullWidth={1} size="large" style={{ height: "98%", justifyContent: "flex-start" }}>
                    <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>People</Typography>
                </Button>
            </Box>

            <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
                <Button fullWidth={1} size="large" style={{ height: "98%", justifyContent: "flex-start" }}>
                    <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>Meetings</Typography>
                </Button>
            </Box>

            <Box mt="2px" width={.99} bgcolor="primary" height="60px" marginLeft="1%">
                <Button fullWidth={1} size="large" style={{ height: "98%", justifyContent: "flex-start" }}>
                    <Typography variant="h2" style={{ color: "white", padding: "15px 0 0 0" }}>Reminders</Typography>
                </Button>
            </Box>

            <Box mt="2px" width={.99} bgcolor="primary" height="60px" position="absolute" bottom="0">
                <Button size="large" style={{ height: "100%", justifyContent: "flex-start", width: "50%" }}>
                    <Typography variant="h6" style={{ color: "white" }}>Settings</Typography>
                </Button>
                <Button size="large" style={{ height: "100%", justifyContent: "flex-end", width: "50%" }}>
                    <Typography variant="h6" style={{ color: "white" }}>Logout</Typography>
                </Button>
            </Box>






        </ThemeProvider>
    )
};


export default MenuBar