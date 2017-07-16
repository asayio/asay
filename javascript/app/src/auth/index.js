import React, { Component } from 'react';
import queryString from 'query-string';

class LoginValidator extends Component {
  constructor() {
    super();
    this.state = {
      authToken: null
    };
  }

  async componentDidMount() {
    const parsedHash = queryString.parse(window.location.hash);
    const authToken = parsedHash.id_token
    const response = await fetch('/api/auth',
      {method: 'POST',
      body: JSON.stringify({
        authToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const state = response.ok ? {
      authToken
    } : {};
    this.setState(state)
    window.sessionStorage.authToken = authToken;
    this.props.history.replace({
      pathname: './'
    })
    // generalise post help-function
  }

  render() {
    return (
      <main>
        {this.state.authToken ?
        <h1>Login succesful</h1>:
        <h1>Verifying login details</h1>}
      </main>
    );
  }
}

export default LoginValidator;
