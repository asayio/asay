import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SavedModal extends Component {
  render() {
    return (
      <div>
        <h2>Din kandidatprofil blev gemt</h2>
        <p>Din kandidatprofil er ikke offentlig, men kun synlig for dig.</p>
        <p>Du kan altid gå tilbage og rette i projektet, også efter dit kandidatur er offentligt.</p>
        <Link
          to={`../../candidate/${this.props.candidateId}`}
          onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
          className="btn btn-primary mt-8 mb-4">
          OK
        </Link>
      </div>
    );
  }
}

export default SavedModal;
