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
            <h2 className="f4">Handlingen lykkes ikke</h2>
            <p>Din session er udløbet. Log ind igen.</p>
            <p>
              Hvis det stadig ikke virker så{' '}
              <a
                href="mailto:dinevenner@initiativet.dk"
                target="_mailto"
                rel="noopener noreferrer"
                className="dark-blue hover-blue">
                send os en mail
              </a>.
            </p>
            <div>
              <Login
                icon="LogIn"
                iconClass="mr2"
                type="login"
                className="pointer db dib-ns min-w12 white bg-dark-blue hover-bg-blue mv2 mr0 mr3-ns pv2 ph4 ba b--black-10 br1 shadow-6"
              />
            </div>
          </div>
        }
      />
    );
  }
}

export default UnauthorizedModal;
