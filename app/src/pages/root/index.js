import React, { Component } from 'react';
import Login from '../../widgets/auth/Login'
import { Heart, UserPlus } from 'react-feather'
import ProposalList from './ProposalList'

class Root extends Component {
  render() {
    if (window.sessionStorage.authToken) {
      return (
        <ProposalList/>
      )
    } else {
      return (
        <Welcome/>
      );
    }
  }
}

class Welcome extends Component {
  render() {
    return (
      <div className="mw7 center tc">
        <h1 className="f3 mt5 mb3">
          Hvis alle kunne bestemme... <br/>
          Initiativets demokratiske platform til politik udvikling
        </h1>
        <p className="black-70">Hos Initiativet er det dig der bestemmer. Hver gang. Og det gør du her.</p>
        <div className="tl bg-white pa4 mb2 ba b--black-10 br1 shadow-6 lh-copy">
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
        <Login className="pointer db dib-ns white bg-dark-blue hover-bg-blue mt3 mr0 mr3-ns pv2 ph4 ba b--black-10 br1 shadow-6"/>
        <a href="" className="pointer db dib-ns white bg-dark-blue hover-bg-blue mt3 pv2 ph4 ba b--black-10 br1 shadow-6"><UserPlus className="mr2"/>Opret bruger</a>
        <p className="black-70 ma4">Problemer? <a href="mailto:dinevenner@initiativet.net" className="pointer dark-blue hover-blue">Send os en mail</a></p>
      </div>
    );
  }
}

// <footer><a href="https://asay.io" className="dark-pink ttl f7">Coded with <Heart className="svg-icon"/> by asay</a></footer>

export default Root;
