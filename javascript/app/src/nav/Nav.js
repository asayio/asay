import React, { Component } from 'react';
import Login from '../auth/Login.js';
import Logout from '../auth/Logout.js';
import {
  Link
} from 'react-router-dom';
import { Heart } from 'react-feather';

class Nav extends Component {
  render () {
    return (
      <nav className="mb4">
        <Link to="/" className="f3 link dark-pink hover-hot-pink ttl"><Heart className="svg-icon mr2" />Asay</Link>
        {window.sessionStorage.authToken ? <Logout history={this.props.history}/> : <Login/>}
      </nav>
    )
  }
}

export default Nav;
