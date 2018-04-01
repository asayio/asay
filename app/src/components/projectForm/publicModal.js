import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PublicModal extends Component {
  render() {
    const projectId = this.props.projectId;
    return (
      <div>
        <h2>Projektet blev publiceret</h2>
        <p>
          Du kan altid gå tilbage og rette i projektet, som du bliver klogere undervejs. Vi holder styr på tidligere
          versioner for dig.
        </p>
        <p>Husk du altid kan dele dit projekt direkte med linket:</p>
        <p>{window.location.origin + '/project/' + projectId}</p>
        <Link
          to={`../../project/${projectId}`}
          onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
          className="btn btn-primary mt-8 mb-4">
          OK
        </Link>
      </div>
    );
  }
}

export default PublicModal;
