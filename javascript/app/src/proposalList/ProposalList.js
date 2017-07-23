import React, { Component } from 'react';
import CountDown from '../widgets/CountDown';
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
    console.log(this.props.filteredProposals);
    return (
      <div>
      {this.props.filteredProposals.map((proposal, index) =>
        <Link key={proposal.id} to={`/proposal/${proposal.id}`} className="link near-black">
          <div className="pt2 pb3 ph3 ba b--light-gray br2 mv3 lh-solid card ma1">
            <h2 className="f3">{proposal.ref}: {proposal.subtitle}</h2>
            <h3 className="f5 normal small-caps ttl silver mb4">
              <b>Session: </b>{proposal.session}
              <b> Status: </b> {proposal.status}
              <b> Deadline: </b><CountDown dueDate = {proposal.duedate} /><br/>
              {proposal.tags.map((tag) =>
                <span key={tag.id}> #{tag.tag}</span>
              )}
            </h3>
            <p className="dark-gray">{proposal.title}</p>
          </div>
        </Link>
      )}
      </div>
    );
  }
}

export default ProposalListSection;
