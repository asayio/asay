import React, { Component } from 'react';
import Login from '../../components/loginBtn';

class Curious extends Component {
  render() {
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto text-center">
          <h1>Ups! Der er problemer</h1>
          <p className="mx-auto">Vi kan ikke genkende dig. Prøv at logge ind (igen).</p>
          <Login type="login" />
          <p className="mx-auto mt-4">
            Virker det stadig ikke? <a href="mailto:dinevenner@initiativet.dk">Send os en mail</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default Curious;
