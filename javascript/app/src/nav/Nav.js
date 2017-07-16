import React, { Component } from 'react';
import Login from '../auth/Login.js';
import Logout from '../auth/Logout.js';
import {
  Link
} from 'react-router-dom';


class Nav extends Component {
  render () {
    return (
      <nav>
        <Link to="/">asay</Link>
        {window.sessionStorage.authToken ? <Logout history={this.props.history}/> : <Login/>}
      </nav>
    )
  }
}

export default Nav;
