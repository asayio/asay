import React, { Component } from 'react';

class ConfirmationModal extends Component {
  render() {
    const candidate = this.props.candidate;
    return (
      <div>
        <h2>Er du sikker?</h2>
        <p>
          Du kan kun støtte én kandidat og har allerede støttet en anden. Vælger du at støtte
          {' ' + candidate.firstname + ' ' + candidate.lastname} bortfalder den støtte du tidligere har givet til en
          anden kandidat.
        </p>
        <div className="mt-6 mb-2">
          <button
            onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
            className="btn btn-secondary m-2">
            Annuller
          </button>
          <button onClick={() => this.props.supportingCandidate(true)} className="btn btn-primary m-2">
            Bekræft støtte
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmationModal;
