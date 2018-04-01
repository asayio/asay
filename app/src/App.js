// packages
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
import Preferences from './routes/preferences';
import Insights from './routes/insights';
import Search from './routes/search';
import Proposals from './routes/proposals';
import Proposal from './routes/proposal';
import Vote from './routes/proposal/vote';
import Settings from './routes/settings';
import Projects from './routes/projects';
import MyProjects from './routes/projects/mine';
import NewProject from './routes/projects/new';
import Project from './routes/project';
import EditProject from './routes/project/edit';
import Candidates from './routes/candidates';
import Candidate from './routes/candidate';
import EditCandidate from './routes/candidate/edit';

// components
import Nav from './components/nav';
import Footer from './components/footer';
import Onboarding from './routes/onboarding';
import LoadingSpinner from './components/loadingSpinner';
import LandingPage from './components/landingPage';
import Modal from './components/modal/routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      anonymousUser: true,
      modal: false,
      proposalList: [],
      preferenceList: [],
      voteList: [],
      subscriptionList: [],
      notificationList: [],
      committeeCategoryList: [],
      participationList: [],
      projectList: [],
      projectSupportList: [],
      userProjectSupportList: [],
      candidateList: [],
      candidateCommitmentList: [],
      constituencyList: [],
      appReady: false,
      searchString: '',
      filter: {
        category: 'Alle',
        status: 'Alle'
      }
    };
    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    const mountTimestamp = new Date();
    const mountTime = Date.parse(mountTimestamp);
    const expTime = Number(window.localStorage.exp) * 1000 || 0;
    const loginExpired = (expTime - mountTime) / (1000 * 60 * 60) <= 1; // 1 hours;
    this.setState({ anonymousUser: loginExpired });
    if (loginExpired && window.localStorage.cacheStateAnonymous) {
      const cacheState = JSON.parse(window.localStorage.cacheStateAnonymous);
      this.setState(cacheState);
      this.setState({ appReady: true });
    }
    if (!loginExpired && window.localStorage.cacheStateUser) {
      const cacheState = JSON.parse(window.localStorage.cacheStateUser);
      this.setState(cacheState);
      this.setState({ appReady: true });
    }
    const initialState = await stateBuilder.initialState();
    if (initialState) {
      this.setState(initialState);
      this.setState({ appReady: true });
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
      case 'projectList':
        this.setState(stateBuilder.updateProjectList(this.state, entity));
        break;
      case 'projectSupportList':
        this.setState(stateBuilder.updateProjectSupportList(this.state, entity));
        break;
      case 'candidateList':
        this.setState(stateBuilder.updateCandidateList(this.state, entity));
        break;
      case 'modal':
        this.setState({ modal: entity });
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
    const state = JSON.stringify(Object.assign({}, this.state, { modal: false }));
    if (this.state.appReady && this.state.anonymousUser) {
      window.localStorage.cacheStateAnonymous = state;
    }
    if (this.state.appReady && !this.state.anonymousUser) {
      window.localStorage.cacheStateUser = state;
    }
    return (
      <Router>
        <div className="min-h-screen flex flex-col bg-grey-lightest pt-13">
          <Route path="/" component={logPageView} />
          <Modal modal={this.state.modal} updateState={this.updateState} />
          <Nav user={this.state.user} candidateList={this.state.candidateList} updateState={this.updateState} />
          {this.state.appReady ? (
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/auth" component={Auth} />
              <Route
                exact
                path="/proposals"
                render={props =>
                  this.state.anonymousUser ? (
                    <Search
                      updateState={this.updateState}
                      preferenceList={this.state.preferenceList}
                      searchString={this.state.searchString}
                      filter={this.state.filter}
                      proposalList={this.state.proposalList}
                    />
                  ) : (
                    <Proposals proposalList={this.state.proposalList} />
                  )
                }
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
                    anonymousUser={this.state.anonymousUser}
                    proposalList={this.state.proposalList}
                    updateState={this.updateState}
                  />
                )}
              />
              <Route
                exact
                path="/projects"
                render={props => (
                  <Projects
                    updateState={this.updateState}
                    preferenceList={this.state.preferenceList}
                    projectList={this.state.projectList}
                    user={this.state.user}
                  />
                )}
              />
              <Route
                exact
                path="/project/:id"
                render={props => (
                  <Project
                    match={props.match}
                    anonymousUser={this.state.anonymousUser}
                    updateState={this.updateState}
                    projectList={this.state.projectList}
                    user={this.state.user}
                  />
                )}
              />
              <Route
                exact
                path="/candidates"
                render={props => (
                  <Candidates
                    anonymousUser={this.state.anonymousUser}
                    candidateList={this.state.candidateList}
                    user={this.state.user}
                    preferenceList={this.state.preferenceList}
                    constituencyList={this.state.constituencyList}
                  />
                )}
              />
              <Route
                exact
                path="/candidate/:id"
                render={props => (
                  <Candidate
                    match={props.match}
                    anonymousUser={this.state.anonymousUser}
                    candidateList={this.state.candidateList}
                    updateState={this.updateState}
                    user={this.state.user}
                  />
                )}
              />
              {/* ONLY VISIBLE WHEN SIGNED IN*/}
              <Route
                exact
                path="/proposal/:id/vote"
                render={props =>
                  this.state.anonymousUser ? (
                    <Unauthorized />
                  ) : (
                    <Vote match={props.match} proposalList={this.state.proposalList} updateState={this.updateState} />
                  )
                }
              />
              <Route
                exact
                path="/project/:id/edit"
                render={props =>
                  this.state.anonymousUser ? (
                    <Unauthorized />
                  ) : (
                    <EditProject
                      match={props.match}
                      updateState={this.updateState}
                      projectList={this.state.projectList}
                      preferenceList={this.state.preferenceList}
                      user={this.state.user}
                    />
                  )
                }
              />
              <Route
                exact
                path="/candidate/:id/edit"
                render={props =>
                  this.state.anonymousUser ? (
                    <Unauthorized />
                  ) : (
                    <EditCandidate
                      match={props.match}
                      updateState={this.updateState}
                      candidateList={this.state.candidateList}
                      constituencyList={this.state.constituencyList}
                      preferenceList={this.state.preferenceList}
                      user={this.state.user}
                    />
                  )
                }
              />
              <Route
                exact
                path="/projects/new"
                render={props =>
                  this.state.anonymousUser ? (
                    <Unauthorized />
                  ) : (
                    <NewProject updateState={this.updateState} preferenceList={this.state.preferenceList} />
                  )
                }
              />
              <Route
                exact
                path="/projects/mine"
                render={props =>
                  this.state.anonymousUser ? (
                    <Unauthorized />
                  ) : (
                    <MyProjects
                      updateState={this.updateState}
                      preferenceList={this.state.preferenceList}
                      searchString={this.state.searchString}
                      filter={this.state.filter}
                      projectList={this.state.projectList}
                      user={this.state.user}
                    />
                  )
                }
              />
              <Route
                exact
                path="/insights"
                render={props =>
                  this.state.anonymousUser ? <Unauthorized /> : <Insights proposalList={this.state.proposalList} />
                }
              />
              <Route
                exact
                path="/preferences"
                render={props =>
                  this.state.anonymousUser ? (
                    <Unauthorized />
                  ) : (
                    <Preferences preferenceList={this.state.preferenceList} updateState={this.updateState} />
                  )
                }
              />
              <Route
                exact
                path="/settings"
                render={props =>
                  this.state.anonymousUser ? (
                    <Unauthorized />
                  ) : (
                    <Settings user={this.state.user} updateState={this.updateState} />
                  )
                }
              />
              <Route
                exact
                path="/onboarding"
                render={props =>
                  this.state.anonymousUser ? (
                    <Unauthorized />
                  ) : (
                    <Onboarding preferenceList={this.state.preferenceList} updateState={this.updateState} />
                  )
                }
              />
              <Route path="*" component={Lost} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/auth" component={Auth} />
              <Route path="*" component={LoadingSpinner} />
            </Switch>
          )}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
