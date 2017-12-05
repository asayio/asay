import React, { Component } from 'react';

class Logout extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <a onClick={this.logout} className={this.props.className}>Log ud</a>
    );
  }
  logout = async() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.reload();
  }
}

export default Logout;
