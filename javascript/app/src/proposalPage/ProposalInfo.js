import React, { Component } from 'react';
import Poll from '../widgets/poll/Poll';

class ProposalInfo extends Component {

  render() {
    const proposal = this.props.proposalInfo;
    return (
      <div>
        <h1 className="mb1">{proposal.nummer}: {proposal.titelkort}</h1>
        <h2 className="f4 normal ttl small-caps dib mr3 silver"><b>Type:</b> {proposal.type},</h2>
        <h2 className="f4 normal ttl small-caps dib mr3 silver"><b>Session:</b></h2>
        <h2 className="f4 normal ttl small-caps dib mr3 silver"><b>Status:</b></h2>
        <p className="dark-gray mt2 mb4">{proposal.titel}</p>
        <h3>Relevante dokumenter</h3>
        <ul>{this.props.attachments.map( (attachment) =>
          <li key={attachment.id}><a href={attachment.url} target="_blank">{attachment.title}</a></li>
        )}</ul>
        <br/><h3>Afstemninger</h3>
        {this.props.polls.map( (poll) =>
          <Poll key={poll.status} poll = {poll} proposal = {proposal} />
        )}

      </div>
    );
  }
}

export default ProposalInfo;
