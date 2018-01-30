import React, { Component } from 'react';
import Modal from '../';

class ErrorModal extends Component {
  render() {
    return (
      <Modal
        content={
          <div>
            <h2>Der er sket en fejl</h2>
            <p>
              Det er ikke dig, det er os. Prøv igen, og hvis det stadig ikke virker så{' '}
              <a href="mailto:dinevenner@initiativet.dk" target="_mailto" rel="noopener noreferrer" className="link">
                send os en mail
              </a>.
            </p>
            <div>
              <button
                onClick={() => this.props.updateState({ entityType: 'error', entity: false })}
                className="btn btn-primary my-8">
                OK
              </button>
            </div>
          </div>
        }
      />
    );
  }
}

export default ErrorModal;
