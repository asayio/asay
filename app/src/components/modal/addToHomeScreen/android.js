import React, { Component } from 'react';
import FeatherIcon from '../../featherIcon';

class AddToHomeScreenModalAndroid extends Component {
  render() {
    return (
      <div>
        <h2>Tilføj til startskærm</h2>
        <p>Vil du prøve Initiativets platform som app?</p>
        <p>
          Klik på <FeatherIcon name="MoreVertical" />-ikonet i din browser, og tryk på 'Føj til hjemmeskærm'.
        </p>
        <button
          className="btn btn-primary mt-8 mb-4"
          onClick={() => {
            this.props.updateState({ entityType: 'modal', entity: false });
            window.localStorage.promptAddToHomeScreen = false;
          }}>
          OK
        </button>
      </div>
    );
  }
}

export default AddToHomeScreenModalAndroid;
