import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ThemeProvider } from "@material-ui/styles";
import Theme from "./themes/landingTheme";
import Box from "@material-ui/core/Box";

import LandingPage from "./views/LandingPage"
import PeopleInfoPage from "./views/PeopleInfoPage"
import HomePage from "./views/HomePage"


var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <ThemeProvider theme={Theme}>
      <Box align="center" height="100%">
        <Route exact path="/" component={LandingPage} />
        <Route path="/PeopleInformation" component={PeopleInfoPage} />
        <Route path="/HomePage" component={HomePage} />
      </Box>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')

);

