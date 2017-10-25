import React, { Component } from 'react';
import Logout from '../../widgets/auth/Logout';
import { Check } from 'react-feather';

class Disclaimer extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

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
      <div className="mw8 center tc w-100 flex-auto">
        <h1 className="f3 mt5 mb4">Inden vi går i gang</h1>
        <div className="tl bg-white pa4 mb2 ba b--black-10 br1 shadow-6 lh-copy">
          <h2 className="f4">Platformen er under udvikling</h2>
          <p>Vi vil så gerne have feedback så vi kan lære af vores fejl og gøre det bedre næste gang. Derfor har vi valgt at give dig adgang til platformen mens vi stadig udvikler. Det betyder at funktionaliteten er begrænset og du risikrer at opleve fejl. Det betyder, at loading hastigheden ikke er så hurtig, fordi al den information du læser er hentet live fra ft.dk. Men det betyder også, at du kan være med til at forme platformen, så det opfylder dine behov. Tak fordi du vil være med.</p>
          <h2 className="f4">Datasikkerhed og privatliv</h2>
          <p>Dine oplysninger behandles efter gældende persondatalovgivning med Initiativet som databehandler. Vi har dit fornavn- og efternavn samt din email registret sammen med de stemmer du afgiver. Hvis du ikke er okay med det, så vent med at stem. Vi arbejder nemlig på en bedre, mere sikker og privat løsning. Det tager bare lidt længere tid. Tak for din tålmodighed.</p>
        </div>
        <Logout className="pointer dib dark-blue w4 pv2 ma3 ba b--dark-blue br1" />
        <a onClick={this.handleAccept} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma3 ba b--black-10 br1 shadow-6"><Check className="mr2"/>Accepter</a>
      </div>
    );
  }
}

export default Disclaimer;
