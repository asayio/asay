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
        <Link key={proposal.id} to={`/proposal/${proposal.id}`} className="link near-black">
          <div className="pt2 pb3 ph3 ba b--light-gray br2 mv3 lh-solid card ma1">
            <h2 className="f4 f3-l">{proposal.ref} {proposal.subtitle}</h2>
            <h3 className="f5 normal small-caps ttl silver mb4"><b>Session: </b>{proposal.session}, <b>Status: </b> {proposal.status}, <b>Deadline: </b>{proposal.duedate}</h3>
            <p className="dark-gray">{proposal.title}</p>
          </div>
        </Link>
      )}
      </div>
    );
  }
}

export default ProposalListSection;
