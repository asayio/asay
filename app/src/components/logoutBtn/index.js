import React, { Component } from 'react';

class Logout extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <button onClick={this.logout} className={this.props.className}>
        Log ud
      </button>
    );
  }
  logout = async () => {
    window.sessionStorage.clear();
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('exp');
    window.localStorage.removeItem('cacheStateUser');
    window.location.reload();
  };
}

export default Logout;
