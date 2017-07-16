import React, { Component } from 'react';
import Login from '../auth/Login.js';
import Logout from '../auth/Logout.js';
import {
  Link
} from 'react-router-dom';


class Nav extends Component {
  render () {
    return (
      <nav className="mb4">
        <Link to="/" className="f3 link dark-green hover-green">asay</Link>
        {window.sessionStorage.authToken ? <Logout history={this.props.history}/> : <Login/>}
      </nav>
    )
  }
}

export default Nav;
