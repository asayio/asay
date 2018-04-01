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
    const authInfo = response.ok && (await response.json());
    if (response.ok) {
      window.localStorage.authToken = authToken;
      window.localStorage.exp = authInfo.exp;
    }
    let pathname = window.location.origin + '/proposals';
    if (response.status === 403) {
      pathname = window.location.origin + '/?emailverification=missing';
    }
    if (response.status === 401) {
      pathname = window.location.origin + '/401';
    }
    if (authInfo.user && !authInfo.user.onboarded) {
      pathname = window.location.origin + '/onboarding';
    }
    if (
      window.sessionStorage.redirectUrl &&
      (window.sessionStorage.redirectUrl.includes('project') || window.sessionStorage.redirectUrl.includes('candidate'))
    ) {
      pathname = window.sessionStorage.redirectUrl;
    }
    window.location.replace(pathname);
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
