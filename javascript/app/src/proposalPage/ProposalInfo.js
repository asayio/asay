import React, { Component } from 'react';
import Poll from '../widgets/Poll';

class ProposalInfo extends Component {

  render() {
    const proposal = this.props.proposalInfo;
    return (
      <div>
        <h1 className="mb1">{proposal.ref}: {proposal.subtitle}</h1>
        <h2 className="f4 normal ttl small-caps dib mr3 silver"><b>Type:</b> {proposal.type},</h2>
        <h2 className="f4 normal ttl small-caps dib mr3 silver"><b>Session:</b> {proposal.session},</h2>
        <h2 className="f4 normal ttl small-caps dib mr3 silver"><b>Status:</b> {proposal.status}</h2>
        <p className="dark-gray mt2 mb4">{proposal.title}</p>
        {this.props.polls.map( (poll) =>
          <Poll key={poll.status} poll = {poll} proposal = {proposal} />
        )}
      </div>
    );
  }
}

export default ProposalInfo;
