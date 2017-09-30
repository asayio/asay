import React, { Component } from 'react';

class Confirmation extends Component {
  render() {
    return (
      <div>
        <h1>Din valghandling er registreret</h1>
        <p>Luk vinduet for at vende tilbage forslaget</p>
        <button onClick={() => window.close()}>Luk stemmeboks</button>
      </div>
    );
  }
}

export default Confirmation;
