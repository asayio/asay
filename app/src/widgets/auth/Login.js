import React, { Component } from 'react';
import Lock from 'auth0-lock';
import Da from './i18n_da.js';
import { LogIn } from 'react-feather';

class Login extends Component {
  render() {
    return (
      <a onClick={this.login} className={this.props.className}><LogIn className="mr2"/>Log ind</a>
    );
  }
  login = async() => {
    const clientId = '1SQLoULbKUTpJC0T5zv2ailBYb3Jw51u'
    const domain = 'initiativet.eu.auth0.com'
    const options = {
      auth: {
        redirectUrl: window.location.origin + '/auth',
        responseType: 'token',
        params: {
          scope: 'openid email picture'
        }
      },
      theme: {
        logo: 'https://sjwinther.github.io/asay.landing/favicon.svg',
        primaryColor: '#00449E',
      },
      languageDictionary: Da,
      allowSignUp: false,
      rememberLastLogin: false,
      allowForgotPassword: false,
      allowShowPassword: true
    }
    const lock = new Lock (clientId, domain, options)
    lock.show() //show password dialog from Auth0
  }
}

export default Login;
