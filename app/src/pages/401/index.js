import React, { Component } from 'react';
import Login from '../../widgets/auth/Login'

class Curious extends Component {
  render() {
    return (
      <div className="mw8 center tc">
        <h1 className="f3 mt5 mb4">Ooops...</h1>
        <p>Der er problemer. Vi kan ikke genkende dig. Prøv at logge ind (igen).</p>
        <Login className="pointer dib white bg-dark-blue hover-bg-blue mv3 pv3 ph4 ba b--black-10 br1 shadow-6"/>
        <p>Virker det stadig ikke? <a href="mailto:dinevenner@initiativet.net" className="pointer dark-blue hover-blue">Send os en mail</a>.</p>
      </div>
    );
  }
}

export default Curious;
