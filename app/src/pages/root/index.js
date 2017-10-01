import React, { Component } from 'react';
import Login from '../../widgets/auth/Login'
// import { Heart, UserPlus } from 'react-feather'
import ProposalList from './ProposalList'

class Root extends Component {
  render() {
    if (window.sessionStorage.authToken) {
      return (
        <ProposalList/>
      )
    } else {
      return (
        <YC/>
      );
    }
  }
}

/*class Welcome extends Component {
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
}*/

class YC extends Component {
  render() {
    return (
      <div className="mw8 center tc">
        <h1 className="f3 mt5 mb4">Hi YC!</h1>
        <div className="tl bg-white pa4 ba b--black-10 br1 shadow-6 lh-copy">
          <p>Hey guys! Sorry for forcing you to login, but disabling authentication throughout the project is not worthwhile.<br/>
          <b>E-mail:</b> yc@asay.io<br/>
          <b>Password:</b> W2018<br/>
          You're looking at actual legislation from Danish parliament. That's why it's all in Danish. But click around and vote anyway!</p>
        </div>
        <Login className="pointer dib white bg-dark-blue hover-bg-blue mt3 pv3 ph4 ba b--black-10 br1 shadow-6"/>
      </div>
    );
  }
}

export default Root;
