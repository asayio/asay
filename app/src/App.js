import 'tachyons';
import './App.css';
import stateBuilder from './stateBuilder/index';
import React, { Component } from 'react';
import Auth from './pages/auth';
import Proposal from './pages/proposal';
import Vote from './pages/proposal/vote';
import Root from './pages/root';
import Unauthorized from './pages/401';
import Disclaimer from './pages/disclaimer';
import Preferences from './pages/preferences';
import Lost from './pages/404';
import Nav from './widgets/nav/Nav';
import Footer from './widgets/Footer';
import Onboarding from './pages/onboarding';
import LoadingSpinner from './widgets/LoadingSpinner';
import Modal from './components/modal';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddToHomeScreenModal: false,
      showErrorModal: false,
      proposalList: [],
      preferenceList: [],
      voteList: [],
      subscriptionList: [],
      notificationList: [],
      committeeCategoryList: [],
      participationList: [],
      appReady: false,
      selectedSection: 'personal',
      searchString: '',
      filter: {
        category: 'Alle',
        status: 'Alle'
      }
    };
    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    const initialState = await stateBuilder.initialState();
    this.setState(initialState);
    this.setState({ appReady: true });
    window.localStorage.promptAddToHomeScreen === undefined &&
      navigator.userAgent.match(/iPhone|iPad|iPod/i) &&
      this.setState({ showAddToHomeScreenModal: 'apple' });
    window.localStorage.promptAddToHomeScreen === undefined &&
      navigator.userAgent.match(/Android/i) &&
      this.setState({ showAddToHomeScreenModal: 'android' });
  }

  updateState({ entityType, entity }) {
    switch (entityType) {
      case 'preferenceList':
        this.setState(stateBuilder.updatePreferences(this.state, entity));
        break;
      case 'voteList':
        this.setState(stateBuilder.updateVoteList(this.state, entity));
        break;
      case 'subscriptionList':
        this.setState(stateBuilder.updateSubscriptionList(this.state, entity));
        break;
      case 'selectedSection':
        this.setState(stateBuilder.updateSelectedSection(this.state, entity));
        break;
      case 'searchString':
        this.setState(stateBuilder.updateSearchString(this.state, entity));
        break;
      case 'filter':
        this.setState(stateBuilder.updateFilter(this.state, entity));
        break;
      case 'notificationList':
        this.setState(stateBuilder.updateNotificationList(this.state, entity));
        break;
      case 'error':
        this.setState({ showErrorModal: entity });
        break;
      default:
        break;
    }
  }

  render() {
    if (window.sessionStorage.authToken) {
      return (
        <Router>
          <div className="min-vh-100 flex flex-column ph3 pt5">
            <Nav />
            {this.state.showErrorModal && (
              <Modal
                content={
                  <div>
                    <h2 className="f4">Der er sket en fejl</h2>
                    <p>
                      Det er ikke dig, det er os. Prøv igen, og hvis det stadig ikke virker så{' '}
                      <a
                        href="mailto:dinevenner@initiativet.net"
                        target="_mailto"
                        rel="noopener noreferrer"
                        className="dark-blue hover-blue">
                        send os en mail
                      </a>.
                    </p>
                    <div>
                      <a
                        onClick={() => this.setState({ showErrorModal: false })}
                        className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">
                        OK
                      </a>
                    </div>
                  </div>
                }
              />
            )}
            {this.state.appReady ? (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Root
                      selectedSection={this.state.selectedSection}
                      updateState={this.updateState}
                      preferenceList={this.state.preferenceList}
                      searchString={this.state.searchString}
                      filter={this.state.filter}
                      proposalList={this.state.proposalList}
                    />
                  )}
                />
                <Route
                  exact
                  path="/proposal/:id"
                  render={props => (
                    <Proposal
                      match={props.match}
                      proposalList={this.state.proposalList}
                      updateState={this.updateState}
                    />
                  )}
                />
                <Route
                  exact
                  path="/proposal/:id/vote"
                  render={props => (
                    <Vote match={props.match} proposalList={this.state.proposalList} updateState={this.updateState} />
                  )}
                />
                <Route exact path="/disclaimer" component={Disclaimer} />
                <Route
                  exact
                  path="/preferences"
                  render={props => (
                    <Preferences preferenceList={this.state.preferenceList} updateState={this.updateState} />
                  )}
                />
                <Route
                  exact
                  path="/onboarding"
                  render={props => (
                    <Onboarding preferenceList={this.state.preferenceList} updateState={this.updateState} />
                  )}
                />
                <Route exact path="/auth" component={Auth} />
                <Route path="*" component={Lost} />
              </Switch>
            ) : (
              <div className="flex-auto flex justify-center items-center">
                <LoadingSpinner />
              </div>
            )}
            <Footer />
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="min-vh-100 flex flex-column ph3 pt5">
            <Nav />
            {this.state.showAddToHomeScreenModal && (
              <Modal
                content={
                  <div>
                    <h2 className="f4">
                      {this.state.showAddToHomeScreenModal === 'apple' ? 'Prøv et æble' : 'Prøv android'}
                    </h2>
                    <p>
                      {this.state.showAddToHomeScreenModal === 'apple'
                        ? 'beskrivelse af et æble'
                        : 'beskrivelse af noget andet'}
                    </p>
                    <a
                      onClick={() => {
                        this.setState({ showAddToHomeScreenModal: false });
                        window.localStorage.promptAddToHomeScreen = false;
                      }}
                      className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">
                      OK
                    </a>
                  </div>
                }
              />
            )}
            <Switch>
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/401" component={Unauthorized} />
              <Route exact path="/disclaimer" component={Disclaimer} />
              <Route path="*" component={Root} />
            </Switch>
            <Footer />
          </div>
        </Router>
      );
    }
  }
}

export default App;
