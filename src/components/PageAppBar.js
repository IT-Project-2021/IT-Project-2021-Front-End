import Theme from "../themes/landingTheme";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import ArrowBack from '@material-ui/icons/ArrowBackIos'
import Notifications from '@material-ui/icons/Notifications'
import Share from '@material-ui/icons/Share'
import Search from '@material-ui/icons/Search'
import MenuDropDown from "./MenuDropDown";

const palette = Theme.palette
const useStyles = makeStyles({
    root: {
        color: palette.primary.main,
        position: "static",
    },
    toolbar: {
        color: palette.secondary.main,
        minHeight: "110px",
    },
    toolbarText: {
        padding: "0 75% 0 0"
    },
    menu: {
        color: palette.primary.main,
    }

});

const PageAppBar = ({prevPage, tab, type}) => {
    const appBarType = type;
    const classes = useStyles();
    return (
        <AppBar className={classes.root} color="secondary">
        
            <Toolbar className={classes.toolbar}>

                {appBarType === "Back" && 
                <Link to={prevPage}>
                    <IconButton edge="start" aria-label="back" className={classes.toolbar}>
                        <ArrowBack />
                    </IconButton>
                </Link>
                }

                {appBarType === "Menu" && <MenuDropDown/> }                          

                <Typography variant="h4">
                    {tab}
                </Typography>
            
                <Box display="flex" justifyContent="flex-end" width="100%">
                    <Link to={prevPage}>
                    <IconButton aria-label="notifications" className={classes.toolbar}>
                        <Notifications />
                    </IconButton>
                    </Link>

                    <Link to={prevPage}>
                    <IconButton aria-label="share" className={classes.toolbar}>
                        <Share />
                    </IconButton>
                    </Link>

                    <Link to={prevPage}>
                    <IconButton aria-label="search" className={classes.toolbar}>
                        <Search />
                    </IconButton>
                    </Link>
                </Box>
                
            
            </Toolbar>
        </AppBar>
    )
}

export default PageAppBar
