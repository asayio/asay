import React, { Component } from 'react';
import Login from '../../loginBtn';

class UnauthorizedModal extends Component {
  componentDidMount() {
    window.sessionStorage.clear();
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('exp');
    window.localStorage.removeItem('cacheStateUser');
    window.sessionStorage.redirectUrl = window.location;
  }
  render() {
    return (
      <div>
        <h2>Log ind igen</h2>
        <p>Din session er udløbet. Handlingen blev ikke gennemført. </p>
        <p>Log ind og prøv igen.</p>
        <div className="mt-6 mb-2">
          <Login icon="UserPlus" iconClass="mr-2" className="btn btn-primary m-2" type="login" />
        </div>
      </div>
    );
  }
}

export default UnauthorizedModal;
