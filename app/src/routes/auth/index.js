import React, { Component } from 'react';
import queryString from 'query-string';
import LoadingSpinner from '../../components/loadingSpinner';

class Auth extends Component {
  async componentDidMount() {
    const parsedHash = queryString.parse(window.location.hash);
    const authToken = parsedHash.id_token;
    const response = await fetch(`/api/auth/${authToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const authInfo = await response.json();
      window.localStorage.authToken = authToken;
      window.localStorage.exp = authInfo.exp;
      console.log(authInfo.user);
      this.setState({ authorized: true }, function() {
        if (authInfo.user.onboarded) {
          window.location.href = window.sessionStorage.redirectUrl;
        } else {
          window.location.href = './onboarding';
        }
      });
    } else {
      this.props.history.replace({
        pathname: './401'
      });
    }
  }

  render() {
    return (
      <div className="flex-auto flex items-center px-2">
        <LoadingSpinner />
      </div>
    );
  }
}

export default Auth;
