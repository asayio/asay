import React, { Component } from 'react';

class Lost extends Component {
  render() {
    return (
      <div className="mw8 center tc">
        <h1 className="f3 mt5 mb4">Der er problemer...</h1>
        <p>Der er ikke dig, det er os. Vi mangler at lave en side til den URL, du har valgt.</p>
        <a href={window.location.origin} className="pointer dib white bg-dark-blue hover-bg-blue mv3 pv3 ph4 ba b--black-10 br1 shadow-6">Gå til forsiden</a>
      </div>
    );
  }
}

export default Lost;
