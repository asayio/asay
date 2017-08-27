import React, { Component } from 'react';
import { LogOut, User } from 'react-feather';

class Logout extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <a className="dark-pink mr3"><User className="svg-icon" /> {window.sessionStorage.user}</a>
        <a onClick={this.logout} className="pointer link dark-blue hover-blue"><LogOut className="svg-icon mr2" /></a>
      </div>
    );
  }
  logout = async() => {
    window.sessionStorage.removeItem('authToken')
    this.props.history.replace({
      pathname: './'
    })
  }
}

export default Logout;
