import React, { Component } from 'react';
import Lock from 'auth0-lock';
import Da from './i18n_da';
import FeatherIcon from '../featherIcon';

class Login extends Component {
  render() {
    const login = this.props.type === 'login' ? true : false;
    const title = login ? 'Log ind' : 'Opret bruger';
    return (
      <button onClick={this.login} onMouseDown={e => e.preventDefault()} className={this.props.className}>
        {this.props.icon && <FeatherIcon name={this.props.icon} className={this.props.iconClass} />}
        {title}
      </button>
    );
  }
  login = async () => {
    const clientId = '1SQLoULbKUTpJC0T5zv2ailBYb3Jw51u';
    const domain = 'initiativet.eu.auth0.com';
    // const params = [
    //   'client=' + clientId,
    //   'logoURL=' + window.location.origin + '/auth_logo.svg',
    //   'initialScreen=' + this.props.type
    // ];
    // const URL = 'https://' + domain + '/login?' + params.join('&');
    // https://initiativet.eu.auth0.com/login?client=1SQLoULbKUTpJC0T5zv2ailBYb3Jw51u&logoURL=https://app.initiativet.dk/auth_logo.svg&initialScreen=signUp
    const options = {
      auth: {
        redirectUrl: window.location.origin + '/auth',
        responseType: 'token',
        params: {
          scope: 'openid email user_metadata profile'
        }
      },
      theme: {
        logo: window.location.origin + '/auth_logo.svg',
        primaryColor: '#42BFB4'
      },
      additionalSignUpFields: [
        {
          name: 'firstname',
          placeholder: 'Fornavn'
        },
        {
          name: 'lastname',
          placeholder: 'Efternavn'
        }
      ],
      closable: false,
      languageDictionary: Da,
      allowForgotPassword: true,
      allowShowPassword: true,
      rememberLastLogin: true,
      initialScreen: this.props.type,
      allowedConnections: ['Username-Password-Authentication', 'facebook']
    };
    if (
      window.location.href !== window.location.origin + '/401' &&
      window.location.href !== window.location.origin + '/404'
    ) {
      window.sessionStorage.redirectUrl = window.location.href;
    }
    const lock = new Lock(clientId, domain, options);
    lock.show(); //show password dialog from Auth0
  };
}

export default Login;
