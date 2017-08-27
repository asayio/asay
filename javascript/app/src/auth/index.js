import React, { Component } from 'react';
import queryString from 'query-string';

class LoginValidator extends Component {
  constructor() {
    super();
    this.state = {
      status: null
    };
  }

  async componentDidMount() {
    const parsedHash = queryString.parse(window.location.hash);
    const authToken = parsedHash.id_token
    const response = await fetch(`/api/auth/${authToken}`,
      {method: 'GET',
      // body: JSON.stringify({
      //   authToken
      // }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok)  {
      const user = await response.json();
      window.sessionStorage.user = user.firstname + ' ' + user.lastname
      window.sessionStorage.authToken = authToken;
      this.props.history.replace({
        pathname: './'
      })
    } else {
      this.setState({status: false})
    }
  }

  render() {
    return (
      <main>
        {this.state.status === false ?
        <p>Oops. The user you're trying is not authorized. Please contact the administrator.</p>:
        <p>Verifying login details. Please wait.</p>}
      </main>
    );
  }
}

export default LoginValidator;
