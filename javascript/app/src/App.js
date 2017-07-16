import 'tachyons'
import React, { Component } from 'react';
import Root from './rootPage/index.js'
import './App.css';
import ProposalPage from './proposalPage/index.js';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Root}/>
          <Route exact path="/proposal/:id" component={ProposalPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
