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
        <Link key={proposal.id} to={`/proposal/${proposal.id}`} className="link">
          <div className="db near-black hover-mid-gray pv0 ph3 ba b--light-gray br2 mv3 lh-solid">
            <h2 className="f3">{proposal.ref} {proposal.subtitle}</h2>
            <h3 className="f5 small-caps silver">({proposal.title})</h3>
            <p className="dark-gray mb3"><b>Session: </b>{proposal.session}, <b>Status: </b> {proposal.status}, <b>Deadline: </b>{proposal.duedate}</p>
          </div>
        </Link>
      )}
      </div>
    );
  }
}

export default ProposalListSection;
