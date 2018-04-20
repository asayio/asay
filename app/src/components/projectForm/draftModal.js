import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DraftModal extends Component {
  render() {
    return (
      <div>
        <h2>Projektet blev gemt</h2>
        <p>Dit projekt er gemt som kladde, så det kun er synligt for dig.</p>
        <p>
          Du kan altid gå tilbage og rette i projektet, også efter det publiceret. Vi holder styr på tidligere versioner
          for dig.
        </p>
        <Link
          to={`../../project/${this.props.projectId}`}
          onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
          className="btn btn-primary mt-8 mb-4">
          OK
        </Link>
      </div>
    );
  }
}

export default DraftModal;
