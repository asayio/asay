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
            <h2>Opret en bruger</h2>
            <p>For at benytte dig af den funktion, skal du have en bruger.</p>
            <p>Du kan oprette en bruger eller logge ind lige her.</p>
            <div className="mt-6 mb-2">
              <Login icon="UserPlus" iconClass="mr-2" className="btn btn-secondary m-2" type="login" />
              <Login icon="UserPlus" iconClass="mr-2" className="btn btn-primary m-2" />
            </div>
          </div>
        }
      />
    );
  }
}

export default UnauthorizedModal;
