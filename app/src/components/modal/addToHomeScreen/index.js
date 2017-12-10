import React, { Component } from 'react';
import Modal from '../';
import FeatherIcon from '../../featherIcon';

class AddToHomeScreenModal extends Component {
  render() {
    return (
      <Modal
        content={
          <div>
            <h2 className="f4">
              {this.state.showAddToHomeScreenModal === 'apple' ? 'Føj til hjemmeskærm' : 'Tilføj til startskærm'}
            </h2>
            {this.state.showAddToHomeScreenModal === 'apple' ? (
              <div className="black-70 lh-copy">
                <p>Vil du prøve Initiativets platform som app?</p>
                <p>
                  Klik på <FeatherIcon name="Share" />-ikonet nederst i din browser, og tryk på 'Føj til hjemmeskærm'.
                </p>
              </div>
            ) : (
              <div className="black-70 lh-copy">
                <p>Vil du prøve Initiativets platform som app?</p>
                <p>
                  Klik på <FeatherIcon name="MoreVertical" />-ikonet i din browser, og tryk på 'Føj til hjemmeskærm'.
                </p>
              </div>
            )}
            <a
              onClick={() => {
                this.props.updateState({ entityType: 'mobile', entity: false });
                window.localStorage.promptAddToHomeScreen = false;
              }}
              className="dib white bg-dark-blue hover-bg-dark-blue w4 ba b--black10 br1 pa2 ma2">
              Forstået
            </a>
          </div>
        }
      />
    );
  }
}

export default AddToHomeScreenModal;
