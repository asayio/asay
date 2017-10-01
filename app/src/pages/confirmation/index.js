import React, { Component } from 'react';

class Confirmation extends Component {
  render() {
    return (
      <div className="mw8 center tc">
        <h1 className="f3 mt5 mb4">Din valghandling er registreret</h1>
        <p>Luk vinduet for at vende tilbage forslaget.</p>
        <a onClick={() => window.close()} className="pointer dib white bg-dark-blue hover-bg-blue mt3 pv2 ph4 ba b--black-10 br1 shadow-6">Luk stemmeboks</a>
      </div>
    );
  }
}

export default Confirmation;
