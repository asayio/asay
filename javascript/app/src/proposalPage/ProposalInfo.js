import React, { Component } from 'react';
import Poll from '../widgets/poll/Poll';

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
