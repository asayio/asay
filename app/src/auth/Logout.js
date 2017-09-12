import React, { Component } from 'react';

class Logout extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <span className="black-90 mr2">{window.sessionStorage.user}</span>
        <a onClick={this.logout} className="link pointer i-green hover-i-green">Log ud</a>
      </div>
    );
  }
  logout = async() => {
    window.sessionStorage.removeItem('authToken');
    window.sessionStorage.removeItem('user');
    window.location.reload();
  }
}

export default Logout;
