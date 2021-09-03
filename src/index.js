import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ThemeProvider } from "@material-ui/styles";
import Theme from "./theme";
import Box from "@material-ui/core/Box";

import LandingPage from "./views/LandingPage"

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <ThemeProvider theme={Theme}>
      <Box align="center">
        <Route path="/" component={LandingPage} />
        {/* <Route path="/" component={props => <LandingPage {...props} />} /> */}
        {/* <Route path="/" render={props => <LandingPage {...props} />} /> */}
      </Box>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
  
);

