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
      <div>
        <h1>
          Hvis alle kunne bestemme...<br/>
          <span>Initiativets demokratiske platform til politik udvikling</span>
        </h1>

        <p>Hos Initiativet er det dig der bestemmer. Hver gang. Og det gør du her.<br/></p>
        <div>
          <h2>Denne release</h2>
          <span>Udgivet september 2017</span>
          <ul>
            <li>Få hurtig indsigt i udvalgte forslag fra Folketinget</li>
            <li>Stem direkte på forslagene efter din overbevisning</li>
          </ul>
        </div>
        <div>
          <h2>Næste release</h2>
          <span>Forventet til november 2017</span>
          <ul>
            <li>Få let adgang til <i>alle</i> forslag fra Folketinget</li>
            <li>... uden at kende til Folketingets terminologi</li>
          </ul>
        </div>
        <p>Platformen er stadig under udvikling, og adgang er derfor kun for medlemmer.</p>
        <Login/><br/>
        <a href="https://initiativet.net/membership" className="pointer dark-blue hover-blue"><UserPlus className="svg-icon mr2"/>Bliv medlem</a>
        <p>Har du ikke modtaget login? <a href="mailto:dinevenner@initiativet.net" className="pointer dark-blue hover-blue">Send os en mail</a></p>
        <footer><a href="https://asay.io" className="dark-pink ttl f7">Coded with <Heart className="svg-icon"/> by asay</a></footer>
      </div>
    );
  }
}

export default Root;
