import React, { Component } from 'react';
import queryString from 'query-string';
import LoadingSpinner from '../../widgets/LoadingSpinner.js';

class Auth extends Component {

  async componentDidMount() {
    if (window.sessionStorage.authToken) {
      window.sessionStorage.onboarded === "true" ?
      this.props.history.replace({
        pathname: './'
      }) :
      this.props.history.replace({
        pathname: './onboarding'
      })
    } else {
      const parsedHash = queryString.parse(window.location.hash);
      const authToken = parsedHash.id_token
      const response = await fetch(`/api/auth/${authToken}`,
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok)  {
        const user = await response.json();
        window.sessionStorage.firstname = user.firstname;
        window.sessionStorage.lastname = user.lastname;
        window.sessionStorage.onboarded = user.onboarded;
        window.sessionStorage.termsAccepted = user.terms_accepted;
        window.sessionStorage.authToken = authToken;
        await window.location.reload();
      } else {
        this.props.history.replace({
          pathname: './401'
        });
      };
    }
  }

  render() {
    return (
      <div className="flex-auto flex justify-center items-center">
        <LoadingSpinner/>
      </div>
    );
  }
}

export default Auth;
