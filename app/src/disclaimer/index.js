import React, { Component } from 'react';
import { Check } from 'react-feather';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Inden vi går i gang</h1>
        <h2></h2>
        <h2>Datasikkerhed og privatliv</h2>
        <Link to="./" className="pointer link dark-blue hover-blue"><Check className="svg-icon"/>Accepter</Link>
      </div>
    );
  }
}

export default NotFound;
