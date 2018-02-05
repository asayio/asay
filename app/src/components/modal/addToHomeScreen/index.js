import React, { Component } from 'react';
import Modal from '../';
import FeatherIcon from '../../featherIcon';

class AddToHomeScreenModal extends Component {
  render() {
    return (
      <Modal
        content={
          <div>
            <h2>{this.props.type === 'apple' ? 'Føj til hjemmeskærm' : 'Tilføj til startskærm'}</h2>
            {this.props.type === 'apple' ? (
              <div>
                <p>Vil du prøve Initiativets platform som app?</p>
                <p>
                  Klik på <FeatherIcon name="Share" />-ikonet nederst i din browser, og tryk på 'Føj til hjemmeskærm'.
                </p>
              </div>
            ) : (
              <div>
                <p>Vil du prøve Initiativets platform som app?</p>
                <p>
                  Klik på <FeatherIcon name="MoreVertical" />-ikonet i din browser, og tryk på 'Føj til hjemmeskærm'.
                </p>
              </div>
            )}
            <button
              className="btn btn-primary mt-8 mb-4"
              onClick={() => {
                this.props.updateState({ entityType: 'mobile', entity: false });
                window.localStorage.promptAddToHomeScreen = false;
              }}>
              Forstået
            </button>
          </div>
        }
      />
    );
  }
}

export default AddToHomeScreenModal;
