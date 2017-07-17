import 'tachyons';
import './App.css';
import React, { Component } from 'react';
import LoginValidator from './auth'
import ProposalList from './proposalList';
import ProposalPage from './proposalPage';
import VotePage from './votePage';
import ConfirmationPage from './confirmationPage'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="sans-serif near-black pt4 pb5 ph3 mw8 center">
          <Route exact path="/auth0" component={LoginValidator}/>
          <Route exact path="/" component={ProposalList}/>
          <Route exact path="/proposal/:id" component={ProposalPage}/>
          <Route exact path="/proposal/:id/vote" component={VotePage}/>
          <Route exact path="/confirmation" component={ConfirmationPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
