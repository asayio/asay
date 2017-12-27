// packages
import 'tachyons';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

// data
import stateBuilder from './stateBuilder';

// routes
import Unauthorized from './routes/401';
import Lost from './routes/404';
import Auth from './routes/auth';
import Disclaimer from './routes/disclaimer';
import Preferences from './routes/preferences';
import Insights from './routes/insights';
import Search from './routes/search';
import Proposals from './routes/proposals';
import Proposal from './routes/proposal';
import Vote from './routes/proposal/vote';
import Settings from './routes/settings';

// components
import Nav from './components/nav';
import Footer from './components/footer';
import Onboarding from './routes/onboarding';
import LoadingSpinner from './components/loadingSpinner';
import ErrorModal from './components/modal/error';
import UnauthorizedModal from './components/modal/unauthorized';
import AddToHomeScreenModal from './components/modal/addToHomeScreen';
import LandingPage from './components/landingPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loginExpired: true,
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
      searchString: '',
      filter: {
        category: 'Alle',
        status: 'Alle'
      }
    };
    this.updateState = this.updateState.bind(this);
  }

  componentWillMount() {
    window.localStorage.promptAddToHomeScreen === undefined &&
      navigator.userAgent.match(/iPhone|iPad|iPod/i) &&
      this.setState({ showAddToHomeScreenModal: 'apple' });
    window.localStorage.promptAddToHomeScreen === undefined &&
      navigator.userAgent.match(/Android/i) &&
      this.setState({ showAddToHomeScreenModal: 'android' });
  }

  async componentDidMount() {
    const cacheState = window.localStorage.cacheState;
    const mountTimestamp = new Date();
    const mountTime = Date.parse(mountTimestamp);
    const expTime = Number(window.localStorage.exp) * 1000;
    const loginExpired = (expTime - mountTime) / (1000 * 60 * 60) <= 1; // 1 hours;
    this.setState({ loginExpired: loginExpired });
    if (cacheState) {
      const initialState = JSON.parse(cacheState);
      this.setState(initialState);
      this.setState({ appReady: true });
    }
    const initialState = await stateBuilder.initialState();
    if (initialState) {
      this.setState(initialState);
      this.setState({ appReady: true });
      window.localStorage.cacheState = JSON.stringify(initialState);
      console.log(initialState);
    }
  }

  updateState({ entityType, entity }) {
    switch (entityType) {
      case 'user':
        this.setState(stateBuilder.updateUser(this.state, entity));
        break;
      case 'preferenceList':
        this.setState(stateBuilder.updatePreferences(this.state, entity));
        break;
      case 'voteList':
        this.setState(stateBuilder.updateVoteList(this.state, entity));
        break;
      case 'subscriptionList':
        this.setState(stateBuilder.updateSubscriptionList(this.state, entity));
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
      case 'mobile':
        this.setState({ showAddToHomeScreenModal: entity });
        break;
      default:
        break;
    }
  }

  render() {
    const logPageView = () => {
      if (process.env.NODE_ENV === 'production') {
        ReactGA.initialize('UA-107447977-1');
        const page = window.location.pathname;
        ReactGA.set({ page: page });
        ReactGA.pageview(page);
      }
      return null;
    };
    if (window.localStorage.authToken && !this.state.loginExpired) {
      return (
        <Router>
          <div className="min-vh-100 flex flex-column ph2 pt5">
            <Route path="/" component={logPageView} />
            <Nav user={this.state.user} updateState={this.updateState} />
            {this.state.showErrorModal &&
              this.state.showErrorModal !== 401 && <ErrorModal updateState={this.updateState} />}
            {this.state.showErrorModal === 401 && <UnauthorizedModal updateState={this.updateState} />}
            {this.state.appReady ? (
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/proposals" render={props => <Proposals proposalList={this.state.proposalList} />} />
                <Route exact path="/insights" render={props => <Insights proposalList={this.state.proposalList} />} />
                <Route
                  exact
                  path="/search"
                  render={props => (
                    <Search
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
                  path="/settings"
                  render={props => <Settings user={this.state.user} updateState={this.updateState} />}
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
          <div className="min-vh-100 flex flex-column ph2 pt5">
            <Route path="/" component={logPageView} />
            <Nav user={this.state.user} updateState={this.updateState} />
            {this.state.showAddToHomeScreenModal && (
              <AddToHomeScreenModal type={this.state.showAddToHomeScreenModal} updateState={this.updateState} />
            )}
            {this.state.appReady && (
              <Switch>
                <Route
                  exact
                  path="/proposals"
                  render={props => (
                    <Search
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
                  path="/search"
                  render={props => (
                    <Search
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
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/401" component={Unauthorized} />
                <Route exact path="/disclaimer" component={Disclaimer} />
                <Route path="*" component={LandingPage} />
              </Switch>
            )}
            <Footer />
          </div>
        </Router>
      );
    }
  }
}

export default App;
