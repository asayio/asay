import 'tachyons'
import React, { Component } from 'react';
import ProposalList from './proposalList'
import './App.css';
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
          <Route exact path="/" component={ProposalList}/>
          <Route exact path="/proposal/:id" component={ProposalPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
