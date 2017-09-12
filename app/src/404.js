import React, { Component } from 'react';
import { Home } from 'react-feather';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>
          Der er problemer...<br/>
          <span>Der er ikke dig, det er os. Vi mangler at lave en side til den URL du har valgt</span>
        </h1>
        <a href="https://app.initiativet.net/" className="pointer link dark-blue hover-blue"><Home className="svg-icon"/>Tag mig hjem</a>
      </div>
    );
  }
}

export default NotFound;
