import React, { Component } from 'react';
import Login from '../../components/loginBtn';

class Curious extends Component {
  render() {
    return (
      <div className="mw8 center tc w-100 flex-auto">
        <h1 className="f3 mt4 mt5-l mb4">Ooops...</h1>
        <p>Der er problemer. Vi kan ikke genkende dig. Prøv at logge ind (igen).</p>
        <Login
          type="login"
          className="pointer dib white bg-dark-blue hover-bg-blue mv3 pv2 ph3 ba b--black-10 br1 shadow-6"
        />
        <p>
          Virker det stadig ikke?{' '}
          <a href="mailto:dinevenner@initiativet.net" className="pointer dark-blue hover-blue">
            Send os en mail
          </a>.
        </p>
      </div>
    );
  }
}

export default Curious;