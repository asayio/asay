import React, { Component } from 'react';

class EmailVerification extends Component {
  render() {
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto text-center">
          <h1>Bekræft din e-mail</h1>
          <p className="mx-auto mb-4">
            Velkommen til Initiativets platform! Før du kan logge ind første gang, skal du verificere din e-mail
            addresse. Vi har sendt en e-mail til dig med et link, som du skal klikke på.
          </p>
          <p className="mx-auto">
            Har du ikke fået mailen? <button className="inline-link">Klik her, så sender vi en ny</button>.
          </p>
        </div>
      </div>
    );
  }
}

export default EmailVerification;
