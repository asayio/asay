import React, { Component } from 'react';
import Login from './auth/Login'

class Unauthorized extends Component {
  render() {
    return (
      <div>401 - Not Authorized
        <Login/>
      </div>
    );
  }
}

export default Unauthorized;
