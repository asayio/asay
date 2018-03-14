import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PublishedModal extends Component {
  render() {
    const projectId = this.props.projectId;
    return (
      <div>
        <h2>Succes! Projektet blev publiceret</h2>
        <p>
          Dit projekt er nu offentligt og du skal samle opbakning til dit forslag. Det gør du ved at række ud til folk i
          dit netværk og sende dem til din projektside. Det gør det med linket her:
        </p>
        <p>{window.location.origin + '/project/' + projectId}</p>
        <p>Når projektet har samlet støtte fra 15 andre brugere kommer det på projektlisten her på platformen.</p>
        <Link to={`../../project/${projectId}`} className="btn btn-primary mt-8 mb-4">
          OK
        </Link>
      </div>
    );
  }
}

export default PublishedModal;
