import React, { Component } from 'react';
import Logout from '../../widgets/auth/Logout'
import { Check } from 'react-feather';

class Disclaimer extends Component {

  async handleAccept(event) {
    const response = await fetch('/api/user/terms',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      }
    // ).then(
    //     window.location.href="../"
    )
    if (response.ok) {
      window.location.href="../"
    }
  };

  render() {
    return (
      <div>
        <h1>Inden vi går i gang</h1>
        <h2>Platformen er under udvikling</h2>
        <p>Vi vil så gerne have feedback så vi kan lære af vores fejl og gøre det bedre næste gang. Derfor har vi valgt at give dig adgang til platformen mens vi stadig udvikler. Det betyder at funktionaliteten er begrænset og du risikrer at opleve fejl. Men det betyder også, at du kan være med til at forme platformen, så det opfylder dine behov. Tak fordi du vil være med.</p>
        <h2>Datasikkerhed og privatliv</h2>
        <p>Dine oplysninger behandles efter gældende persondatalovgivning med Initiativet som databehandler. Vi har dit fornavn- og efternavn samt din email registret sammen med de stemmer du afgiver. Hvis du ikke er okay med det, så vent med at stem. Vi arbejder nemlig på en bedre, mere sikker og privat løsning. Det tager bare lidt længere tid. Tak for din tålmodighed.</p>
        <Logout />
        <a onClick={this.handleAccept} className="pointer link dark-blue hover-blue"><Check className="svg-icon"/>Accepter</a>
      </div>
    );
  }
}

export default Disclaimer;
