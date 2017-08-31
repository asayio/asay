import React, { Component } from 'react';
import queryString from 'query-string';

class Auth extends Component {

  async componentDidMount() {
    if (window.sessionStorage.authToken) {
      this.props.history.replace({
        pathname: './'
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
      console.log("her");
      if (response.ok)  {
        const user = await response.json();
        window.sessionStorage.user = user.firstname + ' ' + user.lastname;
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
      <p>Verifying login details. Please wait.</p>
    );
  }
}

export default Auth;
