import React, { Component } from 'react';
import Login from '../../widgets/auth/Login'
import LoadingSpinner from '../../widgets/LoadingSpinner.js';
import ProposalList from './ProposalList';

class Root extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    if (window.sessionStorage.authToken && !this.props.proposalList.length) {
      return <LoadingSpinner/>
    } else if (window.sessionStorage.authToken) {
      return <ProposalList
        selectedSection={this.props.selectedSection}
        updateState={this.props.updateState}
        preferenceList={this.props.preferenceList}
        searchString={this.props.searchString}
        proposalList={this.props.proposalList}/>
    } else {
      return <Welcome/>
    }
  }
}

class Welcome extends Component {
  render() {
    return (
      <div className="mw8 center tc">
        <h1 className="f3 mt5 mb3">
          Initiativets demokratiske platform til politik udvikling
        </h1>
        <p className="black-70">Hos Initiativet er det dig der bestemmer. Hver gang. Og det gør du her.</p>
        <Login icon="LogIn" iconClass="" type="login" className="pointer db dib-ns white bg-dark-blue hover-bg-blue mv2 mr0 mr3-ns pv2 ph4 ba b--black-10 br1 shadow-6"/>
        <Login icon="UserPlus" iconClass="" type="signUp" className="pointer db dib-ns white bg-dark-blue hover-bg-blue mv2 pv2 ph4 ba b--black-10 br1 shadow-6"/>
        <div className="tl bg-white pa4 mv3 ba b--black-10 br1 shadow-6 lh-copy">
          <h2 className="mt2 mb0">Denne release</h2>
          <span className="black-50">Udgivet september 2017</span>
          <ul>
            <li>Få hurtig indsigt i udvalgte forslag fra Folketinget</li>
            <li>Stem direkte på forslagene efter din overbevisning</li>
          </ul>
          <h2 className="mt2 mb0">Næste release</h2>
          <span className="black-50">Forventet til november 2017</span>
          <ul>
            <li>Få let adgang til <i>alle</i> forslag fra Folketinget</li>
            <li>... uden at kende til Folketingets terminologi</li>
          </ul>
        </div>
        <p className="black-70 ma4">Problemer? <a href="mailto:dinevenner@initiativet.net" className="pointer dark-blue hover-blue">Send os en mail</a></p>
      </div>
    );
  }
}

export default Root;
