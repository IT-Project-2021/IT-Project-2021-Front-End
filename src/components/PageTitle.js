import Theme from "../themes/landingTheme";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const palette = Theme.palette
const useStyles = makeStyles({
    titleText: {
        color: palette.primary.main,
        align: "center"
    },
});

const PageTitle = () => {
    const classes = useStyles();
    return (
        <Box className={classes.titleText} mt="100px">
            <Typography variant="h1">
                My Daily <br /> Planner
            </Typography>
        </Box>
    )
}

export default PageTitle
