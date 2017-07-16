import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
        </div>
      </Router>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div>hello world</div>
    );
  }
}

export default App;
