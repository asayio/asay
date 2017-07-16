import React, { Component } from 'react';
import Lock from 'auth0-lock';

class Login extends Component {
  render() {
    return (
      <a onClick={this.login}>Log ind</a>
    );
  }
  login = async() => {
    const clientId = '1SQLoULbKUTpJC0T5zv2ailBYb3Jw51u'
    const domain = 'initiativet.eu.auth0.com'
    const options = {
      auth: {
        redirectUrl: 'http://localhost:3000/auth0', // make dynamic
        responseType: 'token',
        params: {
          scope: 'openid email picture'
        }
      },
      theme: {
        // logo: '',
        primaryColor: '#42BFB4'
      },
      languageDictionary: {
        title: ''
},
    }
    const lock = new Lock (clientId, domain, options)
    lock.show() //show password dialog from Auth0
  }
}

export default Login;
