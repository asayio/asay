import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ActiveModal extends Component {
  render() {
    const candidateId = this.props.candidateId;
    return (
      <div>
        <h2>Tillykke! Dit kandidatur er offentligt</h2>
        <p>Dit kandidatur fremgår på listen over kandidater.</p>
        <p>
          Du skal nu række ud til folk i dit netværk og sende dem til din kandidatprofil og for at samle støtte til din
          opstilling. Det gør du med linket her:
        </p>
        <p>{window.location.origin + '/candidate/' + candidateId}</p>
        <p />
        <Link
          to={`../../candidate/${candidateId}`}
          onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
          className="btn btn-primary mt-8 mb-4">
          OK
        </Link>
      </div>
    );
  }
}

export default ActiveModal;
