import React, { Component } from 'react';
import Login from './auth/Login'

class NotFound extends Component {
  render() {
    return (
      <div>404 - Not Found
        <Login/>
      </div>
    );
  }
}

export default NotFound;
