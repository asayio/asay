import 'tachyons';
import './App.css';
import proposalFetcher from './fetcher/proposalFetcher';
import appDataBundleFetcher from './fetcher/appDataBundleFetcher';
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
  constructor(props) {
    super(props);
    this.state = {
      proposalList: []
    };
  }

  async componentDidMount() {
    const appDataBundle = await appDataBundleFetcher();
    const packedProposalList = await proposalFetcher();
    const proposalList = packedProposalList.map(proposal => {
      return Object.assign({}, {id: proposal.id}, proposal.info)
    })
    this.setState({proposalList})
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
              <Route exact path="/proposal/:id/vote" render={props => <Vote match={props.match} proposalList={this.state.proposalList}/>}/>
              <Route exact path="/disclaimer" component={Disclaimer}/>
              <Route exact path="/preferences" render={props => <Preferences proposalList={this.state.proposalList}/>}/>
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
