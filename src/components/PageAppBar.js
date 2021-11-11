import Theme from "../themes/landingTheme";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import MenuDropDown from "./MenuDropDown";
// import Notifications from '@material-ui/icons/Notifications'
// import Share from '@material-ui/icons/Share'
// import Search from '@material-ui/icons/Search'
// import Box from "@material-ui/core/Box";

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

// class BackButton extends Component {
//     static contextTypes = {
//       router: () => true, 
//     }
  
//     render() {
//       return (        
//         <IconButton edge="start" onClick={this.context.router.history.goBack} aria-label="back" className={classes.toolbar}>
//             <ArrowBack />
//         </IconButton>
//       )
//     }
//   }

const PageAppBar = ({tab, type}) => {
    let history = useHistory();
    const appBarType = type;
    const classes = useStyles();
    return (
        <AppBar className={classes.root} color="secondary">
        
            <Toolbar className={classes.toolbar}>

                {appBarType === "Back" && 
                    <IconButton onClick={history.goBack} edge="start" aria-label="back" className={classes.toolbar}>
                        <ArrowBack />
                    </IconButton>                
                }

                {appBarType === "Menu" && <MenuDropDown/> }                          

                <Typography variant="h4">
                    {tab}
                </Typography>
            
                {/* <Box display="flex" justifyContent="flex-end" width="100%">
                    
                    <IconButton aria-label="notifications" className={classes.toolbar}>
                        <Notifications />
                    </IconButton>

                    <IconButton aria-label="share" className={classes.toolbar}>
                        <Share />
                    </IconButton>

                    <IconButton aria-label="search" className={classes.toolbar}>
                        <Search />
                    </IconButton>
                </Box> */}
                
            
            </Toolbar>
        </AppBar>
    )
}

export default PageAppBar
