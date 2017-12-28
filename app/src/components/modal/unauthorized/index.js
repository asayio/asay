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
            <h2>Ooops...</h2>
            <p>Der er problemer. Vi kan ikke genkende dig. Prøv at logge ind (igen).</p>
            <p>
              Virker det stadig ikke? <a href="mailto:dinevenner@initiativet.dk">Send os en mail</a>.
            </p>
            <div>
              <Login icon="LogIn" iconClass="" type="login" />
            </div>
          </div>
        }
      />
    );
  }
}

export default UnauthorizedModal;
