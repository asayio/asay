import tachyons from 'tachyons'
import React, { Component } from 'react';
import Root from './RootPage/Root.js'
import './App.css';
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
          <Route exact path="/" component={Root}/>
          <Route exact path="/proposal/:id" component={ProposalPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
