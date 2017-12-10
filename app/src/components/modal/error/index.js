import React, { Component } from 'react';
import Modal from '../';

class ErrorModal extends Component {
  render() {
    return (
      <Modal
        content={
          <div>
            <h2 className="f4">Der er sket en fejl</h2>
            <p>
              Det er ikke dig, det er os. Prøv igen, og hvis det stadig ikke virker så{' '}
              <a
                href="mailto:dinevenner@initiativet.dk"
                target="_mailto"
                rel="noopener noreferrer"
                className="dark-blue hover-blue">
                send os en mail
              </a>.
            </p>
            <div>
              <a
                onClick={() => this.props.updateState({ entityType: 'error', entity: false })}
                className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">
                OK
              </a>
            </div>
          </div>
        }
      />
    );
  }
}

export default ErrorModal;
