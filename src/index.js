import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ThemeProvider } from "@material-ui/styles";
import Theme from "./themes/landingTheme";
import Box from "@material-ui/core/Box";

import LandingPage from "./views/LandingPage.jsx"
import PeopleInfoPage from "./views/PeopleInfoPage"
import MenuBar from './views/Menubar';



var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <ThemeProvider theme={Theme}>
      <Box align="center" height="100%">
        <Route exact path="/" component={LandingPage} />
        <Route path="/people_info" component={PeopleInfoPage} />
        <Route path="/menubar" component={MenuBar}/>
      </Box>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
  
);

