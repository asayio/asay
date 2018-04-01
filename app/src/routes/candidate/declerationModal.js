import React, { Component } from 'react';

class DeclerationModal extends Component {
  render() {
    const candidate = this.props.candidate;
    return (
      <div>
        <h2>Vi har registreret din støtte til {candidate.firstname + ' ' + candidate.lastname}</h2>
        <p>
          For at få kandidaten i Folketinget, har vi også brug for din vælgererklæring, så Initiativet kan stille op til
          næste Folketingsvalg.
        </p>
        <div className="mt-6 mb-2">
          <button
            onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
            className="btn btn-secondary m-2">
            Luk vinduet
          </button>
          <a
            href={`https://initiativet.dk/sign/forward?referrer=${window.location}`}
            target="_declaration"
            onClick={() => this.props.giveDecleration()}
            className="btn btn-primary m-2">
            Giv en vælgererklæring
          </a>
        </div>
        <div className="text-center mt-4">
          <button onClick={() => this.props.giveDecleration()} className="text-grey hover:text-grey-dark">
            Jeg har allerede støttet
          </button>
        </div>
      </div>
    );
  }
}

export default DeclerationModal;
