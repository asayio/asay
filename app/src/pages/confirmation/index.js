import React, { Component } from 'react';

class Confirmation extends Component {
  render() {
    function closeTab (event) {
      window.close()
    }
    return (
      <div>
        <h1>Din stemme er registreret</h1>
        <p>Luk vinduet for at vende tilbage forslaget</p>
        <button onClick={() => closeTab()}>Luk stemmeboks</button>
      </div>
    );
  }
}

export default Confirmation;
