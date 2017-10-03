import React, { Component } from 'react';
import { LogOut } from 'react-feather';

class Logout extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <a onClick={this.logout} className={this.props.className}><LogOut className="mr2"/>Log ud</a>
    );
  }
  logout = async() => {
    window.sessionStorage.removeItem('authToken');
    window.sessionStorage.removeItem('user');
    window.location.reload();
  }
}

export default Logout;
