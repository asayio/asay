import React, { Component } from 'react';
// import Poll from '../widgets/poll/Poll';

class ProposalInfo extends Component {
  render() {
    const proposal = this.props.proposalInfo;
    if (this.props.openDataCaseType && this.props.openDataStatus && this.props.openDataPeriod) {
      return (
        <div>
          <h1 className="mb1">
            {proposal.nummer}: {proposal.titelkort}
          </h1>
          <h2 className="f4 normal ttl small-caps dib mr3 silver">
            <b>Type:</b> {this.props.openDataCaseType[(proposal.typeid - 1)].type} { /* this does NOT work. We need a find på id function! */ }
          </h2>
          <h2 className="f4 normal ttl small-caps dib mr3 silver">
            <b>Session:</b> {this.props.openDataPeriod[(proposal.periodeid - 1)].titel} { /* this does NOT work. We need a find på id function! */ }
          </h2>
          <h2 className="f4 normal ttl small-caps dib mr3 silver">
            <b>Status:</b> {this.props.openDataStatus[(proposal.statusid - 1)].status} { /* this does NOT work. We need a find på id function! */ }
          </h2>
          <p className="dark-gray mt2 mb4">
            {proposal.titel}
          </p>
          { /*
          <h3>Relevante dokumenter</h3>
          <ul>{this.props.attachments.map( (attachment) =>
            <li key={attachment.id}><a href={attachment.url} target="_blank">{attachment.title}</a></li>
          )}</ul>
          <br/><h3>Afstemninger</h3>
          {this.props.polls.map( (poll) =>
            <Poll key={poll.status} poll = {poll} proposal = {proposal} />
          )}
          */ }
        </div>
      );
    } else {
      return(
        <div>
          loading!
        </div>
      )
    }
  }
}

export default ProposalInfo;
