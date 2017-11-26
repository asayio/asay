import "tachyons";
import "./App.css";
import stateBuilder from "./stateBuilder/index";
import React, { Component } from "react";
import Auth from "./pages/auth";
import Proposal from "./pages/proposal";
import Vote from "./pages/proposal/vote";
import Root from "./pages/root";
import Unauthorized from "./pages/401";
import Disclaimer from "./pages/disclaimer";
import Preferences from "./pages/preferences";
import Lost from "./pages/404";
import Nav from "./widgets/nav/Nav";
import Footer from "./widgets/Footer";
import Onboarding from "./pages/onboarding";
import ErrorModal from "./widgets/error/ErrorModal";
import LoadingSpinner from "./widgets/LoadingSpinner";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalList: [],
      preferenceList: [],
      voteList: [],
      subscriptionList: [],
      notificationList: [],
      committeeCategoryList: [],
      participationList: [],
      appReady: false,
      selectedSection: "personal",
      searchString: "",
      filter: {
        category: "Alle",
        status: "Alle"
      }
    };
    this.updateState = this.updateState.bind(this);
  }

  async componentDidMount() {
    const initialState = await stateBuilder.initialState();
    this.setState(initialState);
    this.setState({ appReady: true });
  }

  updateState({ entityType, entity }) {
    switch (entityType) {
      case "preferenceList":
        this.setState(stateBuilder.updatePreferences(this.state, entity));
        break;
      case "voteList":
        this.setState(stateBuilder.updateVoteList(this.state, entity));
        break;
      case "subscriptionList":
        this.setState(stateBuilder.updateSubscriptionList(this.state, entity));
        break;
      case "selectedSection":
        this.setState(stateBuilder.updateSelectedSection(this.state, entity));
        break;
      case "searchString":
        this.setState(stateBuilder.updateSearchString(this.state, entity));
        break;
      case "filter":
        this.setState(stateBuilder.updateFilter(this.state, entity));
        break;
      case 'notificationList':
        this.setState(stateBuilder.updateNotificationList(this.state, entity))
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
            <ErrorModal />
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
