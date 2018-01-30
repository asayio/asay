import React, { Component } from 'react';
import Login from '../../loginBtn';
import Modal from '../';

class UnauthorizedModal extends Component {
  componentDidMount() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.redirectUrl = window.location;
  }
  render() {
    return (
      <Modal
        content={
          <div>
            <h2>Ups. Der er problemer</h2>
            <p>Vi kan ikke genkende dig. Prøv at logge ind (igen).</p>
            <p>
              Virker det stadig ikke?{' '}
              <a href="mailto:dinevenner@initiativet.dk" className="link">
                Send os en mail
              </a>.
            </p>
            <Login icon="LogIn" iconClass="mr-2" type="login" className="btn btn-primary my-8" />
          </div>
        }
      />
    );
  }
}

export default UnauthorizedModal;
