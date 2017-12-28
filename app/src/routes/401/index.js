import React, { Component } from 'react';
import Login from '../../components/loginBtn';

class Curious extends Component {
  render() {
    return (
      <div>
        <h1>Ooops...</h1>
        <p>Der er problemer. Vi kan ikke genkende dig. Prøv at logge ind (igen).</p>
        <Login type="login" />
        <p>
          Virker det stadig ikke? <a href="mailto:dinevenner@initiativet.dk">Send os en mail</a>.
        </p>
      </div>
    );
  }
}

export default Curious;
