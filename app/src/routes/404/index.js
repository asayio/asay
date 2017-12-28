import React, { Component } from 'react';
import { Home } from 'react-feather';

class Lost extends Component {
  render() {
    return (
      <div>
        <h1>Der er problemer...</h1>
        <p>Der er ikke dig, det er os. Vi mangler at lave en side til den URL, du har valgt.</p>
        <a
          onClick={() =>
            this.props.history.replace({
              pathname: '/'
            })
          }>
          <Home />Gå til forsiden
        </a>
      </div>
    );
  }
}

export default Lost;
