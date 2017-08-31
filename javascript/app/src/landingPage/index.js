import React, { Component } from 'react';
import Login from '../auth/Login'

class Unauthorized extends Component {
  render() {
    return (
      <div>This is a landing page.
        <Login/>
      </div>
    );
  }
}

export default Unauthorized;
