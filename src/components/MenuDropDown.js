import Theme from "../themes/landingTheme";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import ArrowBack from '@material-ui/icons/ArrowBackIos'
import Notifications from '@material-ui/icons/Notifications'
import Share from '@material-ui/icons/Share'
import Search from '@material-ui/icons/Search'
import Select from '@material-ui/core/Select';
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close';

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const palette = Theme.palette
const useStyles = makeStyles({
    menuDropDown: {
        color: palette.primary.main,
    },
    closeIcon: {
        color: palette.primary.main,
    },
    dropDownText: {
        color: palette.secondary.main,
        margin: "2vh 2vh"
    },
    optionsBar: {
        color: palette.secondary.main,
        margin: "35vh 2vh 0vh",
        justifyContent: "space-between",
        display: "flex",
    },
    logoutButton: {
        color: palette.secondary.main,
        float: "right",
        textAlign: "left",
        margin: "20vh 2vh 0vh",
    },
    profileButton: {
        color: palette.secondary.main,
        float: "left",
        textAlign: "left",
        margin: "20vh 2vh 0vh",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
});


const BottomRow = () => {

    const classes = useStyles();
    return (

        <Box component="span" m={1} className={classes.optionsBar} >
            <Link to="/Profile" style={{ textDecoration: 'none' }}>
                <Button variant="text" className={classes.profileButton}> 
                    <Typography variant="h4" className={classes.dropDownText}> Profile </Typography>
                </Button>
            </Link>
            
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="text" className={classes.logoutButton}> 
                    <Typography variant="h4" className={classes.dropDownText}> Logout </Typography>
                </Button>
            </Link>   
        </Box>
    )
}

export default function PositionedMenu() {
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IconButton edge="start" aria-label="back" className={classes.menuDropDown}>
            <MenuIcon />
        </IconButton>
      </Button>

      <Menu
        id="demo-positioned-menu"
        PaperProps={{
          style: {
            width: "100%",
            backgroundColor: palette.background.default
          }
        }}
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <IconButton onClick={handleClose} className={classes.menuDropDown}>
            <CloseIcon />
        </IconButton>

        <Link to="/People" style={{ textDecoration: 'none' }}>
            <MenuItem>
                <Typography variant="h3" className={classes.dropDownText}> People </Typography>
            </MenuItem>
        </Link>

        <Link to="/Meetings" style={{ textDecoration: 'none' }}>
            <MenuItem>
                <Typography variant="h3" className={classes.dropDownText}> Meetings </Typography>
            </MenuItem>
        </Link>

        <MenuItem>
            <Typography variant="h3" className={classes.dropDownText}> Reminders </Typography>
        </MenuItem>

        <BottomRow />  

      </Menu>
    </div>
  );
}