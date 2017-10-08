import 'tachyons';
import './App.css';
import React, { Component } from 'react';
import Auth from './pages/auth'
import Proposal from './pages/proposal';
import Vote from './pages/proposal/vote';
import Root from './pages/root'
import Unauthorized from './pages/401';
import Disclaimer from './pages/disclaimer';
import Preferences from './pages/preferences';
import Lost from './pages/404';
import Nav from './widgets/Nav';
import Footer from './widgets/Footer'
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
              <Route exact path="/disclaimer" component={Disclaimer}/>
              <Route exact path="/preferences" component={Preferences}/>
              <Route exact path="/auth" component={Auth}/>
              <Route path="*" component={Lost}/>
            </Switch>
            <Footer/>
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
            <Footer/>
          </div>
        </Router>
      )
    }
  }
};

export default App;
