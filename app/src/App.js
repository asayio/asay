import R from 'ramda'
import 'tachyons';
import './App.css';
import stateBuilder from './stateBuilder/index';
import React, { Component } from 'react';
import Auth from './pages/auth'
import Proposal from './pages/proposal';
import Vote from './pages/proposal/vote';
import Root from './pages/root'
import Unauthorized from './pages/401';
import Disclaimer from './pages/disclaimer';
import Preferences from './pages/preferences';
import Lost from './pages/404';
import Nav from './widgets/nav/Nav';
import Footer from './widgets/Footer'
import Onboarding from './pages/onboarding'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalList: [],
      preferenceList: [],
      voteList: [],
    };
    this.updateState = this.updateState.bind(this)
  }

  async componentDidMount() {
    const initialState = await stateBuilder.initialState();
    this.setState(initialState)
  }

  updateState ({entityType, entity}) {
    switch (entityType) {
      case 'preferenceList':
        const newPreference = Object.assign({}, entity, {preference: !entity.preference})
        const newPreferenceList = R.reject(R.propEq('id', entity.id))(this.state.preferenceList).concat(newPreference)
        const soretedPreferenceList = R.sort((a, b) => a.id - b.id, newPreferenceList)
        this.setState({preferenceList: soretedPreferenceList})
        break;
      default:
        break;
    }
  }

  render() {
    if (window.sessionStorage.authToken) {
      return (
        <Router>
          <div>
            <Nav/>
            <Switch>
              <Route exact path="/" render={props => <Root proposalList={this.state.proposalList}/>} />
              <Route exact path="/proposal/:id" render={props => <Proposal match={props.match} proposalList={this.state.proposalList}/>}/>
              <Route exact path="/proposal/:id/vote" render={props => <Vote match={props.match} proposalList={this.state.proposalList} updateState={this.updateState}/>}/>
              <Route exact path="/disclaimer" component={Disclaimer}/>
              <Route exact path="/preferences" render={props => <Preferences preferenceList={this.state.preferenceList} updateState={this.updateState}/>}/>
              <Route exact path="/onboarding" render={props => <Onboarding preferenceList={this.state.preferenceList}/>}/>
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
              <Route exact path="/disclaimer" component={Disclaimer}/>
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
