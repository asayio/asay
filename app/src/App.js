import 'tachyons';
import './App.css';
import React, { Component } from 'react';
import Auth from './auth'
import ProposalList from './proposalList';
import ProposalPage from './proposalPage';
import VotePage from './votePage';
import ConfirmationPage from './confirmationPage';
import LandingPage from './landingPage'
import Unauthorized from './401';
import NotFound from './404';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    if (window.sessionStorage.authToken) {
      return (
        <Router>
          <div className="sans-serif black-90 pt4 pb5 ph3 mw8 center">
            <Switch>
              <Route exact path="/" component={ProposalList}/>
              <Route exact path="/proposal/:id" component={ProposalPage}/>
              <Route exact path="/proposal/:id/vote" component={VotePage}/>
              <Route exact path="/confirmed" component={ConfirmationPage}/>
              <Route exact path="/auth0" component={Auth}/>
              <Route path="*" component={NotFound}/>
            </Switch>
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div className="sans-serif near-black pt4 pb5 ph3 mw8 center">
            <Switch>
              <Route exact path="/auth0" component={Auth}/>
              <Route exact path="/401" component={Unauthorized}/>
              <Route path="*" component={LandingPage}/>
            </Switch>
          </div>
        </Router>
      )
    }
  }
};

export default App;
