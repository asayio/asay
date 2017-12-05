// packages
import 'tachyons';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// data
import stateBuilder from './stateBuilder/index';

// routes
import Unauthorized from './routes/401';
import Lost from './routes/404';
import Auth from './routes/auth';
import Disclaimer from './routes/disclaimer';
import Insights from './routes/insights';
import Preferences from './routes/preferences';
import Proposal from './routes/proposal';
import Vote from './routes/proposal/vote';
import Root from './routes';

// components
import Nav from './components/nav';
import Footer from './components/footer';
import Onboarding from './routes/onboarding';
import LoadingSpinner from './components/loadingSpinner';
import Modal from './components/modal';
import FeatherIcon from './components/featherIcon';

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
          <div className="min-vh-100 flex flex-column ph2 pt5">
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
                <Route
                  exact
                  path="/insights"
                  render={props => (
                    <Insights
                      selectedSection={this.state.selectedSection}
                      updateState={this.updateState}
                      preferenceList={this.state.preferenceList}
                      searchString={this.state.searchString}
                      filter={this.state.filter}
                      proposalList={this.state.proposalList}
                    />
                  )}
                />
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
                      {this.state.showAddToHomeScreenModal === 'apple'
                        ? 'Føj til hjemmeskærm'
                        : 'Tilføj til startskærm'}
                    </h2>
                    {this.state.showAddToHomeScreenModal === 'apple' ? (
                      <div className="black-70 lh-copy">
                        <p>Vil du prøve Initiativets platform som app?</p>
                        <p>
                          Klik på <FeatherIcon name="Share" />-ikonet nederst i din browser, og tryk på 'Føj til
                          hjemmeskærm'.
                        </p>
                      </div>
                    ) : (
                      <div className="black-70 lh-copy">
                        <p>Vil du prøve Initiativets platform som app?</p>
                        <p>
                          Klik på <FeatherIcon name="MoreVertical" />-ikonet i din browser, og tryk på 'Føj til
                          hjemmeskærm'.
                        </p>
                      </div>
                    )}
                    <a
                      onClick={() => {
                        this.setState({ showAddToHomeScreenModal: false });
                        window.localStorage.promptAddToHomeScreen = false;
                      }}
                      className="dib white bg-dark-blue hover-bg-dark-blue w4 ba b--black10 br1 pa2 ma2">
                      Forstået
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
