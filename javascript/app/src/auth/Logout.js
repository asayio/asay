import React, { Component } from 'react';

class Logout extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <a onClick={this.logout} className="pointer link dark-blue hover-blue">Log ud</a>
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
