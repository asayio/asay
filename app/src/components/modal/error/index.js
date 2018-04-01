import React, { Component } from 'react';

class ErrorModal extends Component {
  render() {
    return (
      <div>
        <h2>Der er sket en fejl</h2>
        <p>
          Det er ikke dig, det er os. Prøv igen, og hvis det stadig ikke virker så{' '}
          <a href="mailto:dinevenner@initiativet.dk" target="_mailto" rel="noopener noreferrer" className="inline-link">
            send os en mail
          </a>.
        </p>
        <button
          onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
          className="btn btn-primary mt-8 mb-4">
          OK
        </button>
      </div>
    );
  }
}

export default ErrorModal;
