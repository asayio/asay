import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class ProposalListSection extends Component {
  constructor() {
    super();
    this.state = {
      proposals:[],
      filteredProposals: [],
    };
  };

  render() {
    return (
      <div>
      {this.props.filteredProposals.map((proposal, index) =>
        <Link key={proposal.id} to={`/proposal/${proposal.id}`}>
          <div>
            <h1>{proposal.ref} {proposal.subtitle}</h1>
            <h2>({proposal.title})</h2>
            <p>{proposal.session}</p>
            <p>{proposal.status}</p>
            <p>{proposal.duedate}</p>
          </div>
        </Link>
      )}
      </div>
    );
  }
}

export default ProposalListSection;
