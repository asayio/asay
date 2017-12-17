import React, { Component } from 'react';
import { Home } from 'react-feather';

class Lost extends Component {
  render() {
    return (
      <div className="mw8 center tc w-100 flex-auto">
        <h1 className="f3 mt4 mt5-l mb4">Der er problemer...</h1>
        <p>Der er ikke dig, det er os. Vi mangler at lave en side til den URL, du har valgt.</p>
        <a
          href={window.location.origin}
          className="pointer dib white bg-dark-blue hover-bg-blue mv3 pv2 ph3 ba b--black-10 br1 shadow-6">
          <Home className="mr2" />Gå til forsiden
        </a>
      </div>
    );
  }
}

export default Lost;
