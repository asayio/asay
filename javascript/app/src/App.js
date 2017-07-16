import 'tachyons'
import './App.css';
import React, { Component } from 'react';
import LoginValidator from './auth'
import ProposalList from './proposalList';
import ProposalPage from './proposalPage';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/auth0/" component={LoginValidator}/>
          <Route exact path="/" component={ProposalList}/>
          <Route exact path="/proposal/:id" component={ProposalPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
