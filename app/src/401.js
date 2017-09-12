import React, { Component } from 'react';
import Login from './auth/Login'

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <h1>
          Ooops...<br/>
          <span>Der er problemer. Vi kan ikke genkende dig. Prøv at logge ind (igen).</span>
        </h1>
        <Login/>
        <p>Virker det stadig ikke? <a href="mailto:dinevenner@initiativet.net" className="pointer link dark-blue hover-blue">Send os en mail</a></p>
      </div>
    );
  }
}

export default Unauthorized;
