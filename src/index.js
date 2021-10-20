import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ThemeProvider } from "@material-ui/styles";
import Theme from "./themes/landingTheme";
import Box from "@material-ui/core/Box";

import LandingPage from "./views/LandingPage"
import PeopleInfoPage from "./views/PeopleInfoPage"
import PeopleListPage from "./views/PeopleListPage"
import HomePage from "./views/HomePage"
import LoginPage from "./views/LoginPage"
import MeetingsPage from "./views/MeetingsPage"
import MeetingInfoPage from "./views/MeetingInfoPage"
import CreateMeetingPage from "./views/CreateMeetingPage"
import SignupPage from "./views/SignupPage"
import ForgotPasswordPage from "./views/ForgotPasswordPage"
import ProfilePage from "./views/ProfilePage"
import ChangePasswordPage from "./views/ChangePasswordPage"
import NewPersonPage from "./views/NewPersonPage"
import { LogStatus } from "./auth/Logged";
import axios from 'axios';
import RemindersPage from './views/RemindersPage';
import EditPersonPage from './views/EditPersonPage'


var hist = createBrowserHistory();
// axios.defaults.withCredentials = true;

ReactDOM.render(
  <LogStatus>
    <Router history={hist}>
      <ThemeProvider theme={Theme}>
        <Box align="center" height="100%">
          <Route exact path="/" component={LandingPage} />
          <Route path="/PeopleInformation/:id" component={PeopleInfoPage} />
          <Route path="/HomePage" component={HomePage} />
          <Route path="/People" component={PeopleListPage} />
          <Route path="/Login" component={LoginPage} />
          <Route path="/Meetings" component={MeetingsPage} />
          <Route path="/MeetingInformation/:id" component={MeetingInfoPage} />
          <Route exact path="/CreateMeeting" component={CreateMeetingPage} />
          <Route exact path="/CreateMeeting/participant/:id" component={CreateMeetingPage} />
          <Route path="/Signup" component={SignupPage} />
          <Route path="/ForgotPassword" component={ForgotPasswordPage} />
          <Route path="/Profile" component={ProfilePage} />
          <Route path="/ChangePassword" component={ChangePasswordPage} />
          <Route path="/AddNewPerson" component={NewPersonPage} />
          <Route path="/Reminders" component={RemindersPage} />
          <Route path="/Person/edit/:id" component={EditPersonPage} />

        </Box>
      </ThemeProvider>
    </Router>
  </LogStatus>,
  document.getElementById('root')


);

