import 'tachyons';
import './App.css';
import React, { Component } from 'react';
import Auth from './pages/auth'
import Proposal from './pages/proposal';
import Vote from './pages/proposal/vote';
import Confirmation from './pages/confirmation';
import Root from './pages/root'
import Unauthorized from './pages/401';
import Disclaimer from './pages/disclaimer';
// import Preferences from './pages/preferences';
import Lost from './pages/404';
import Nav from './widgets/Nav.js';
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
          <div>
            <Nav/>
            <Switch>
              <Route exact path="/" component={Root}/>
              <Route exact path="/proposal/:id" component={Proposal}/>
              <Route exact path="/proposal/:id/vote" component={Vote}/>
              <Route exact path="/confirmed" component={Confirmation}/>
              <Route exact path="/disclaimer" component={Disclaimer}/>
              <Route exact path="/auth" component={Auth}/>
              <Route path="*" component={Lost}/>
            </Switch>
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div>
            <Nav/>
            <Switch>
              <Route exact path="/auth" component={Auth}/>
              <Route exact path="/401" component={Unauthorized}/>
              <Route path="*" component={Root}/>
            </Switch>
          </div>
        </Router>
      )
    }
  }
};

export default App;
