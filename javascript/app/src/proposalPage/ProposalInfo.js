import React, { Component } from 'react';
import Poll from '../widgets/Poll';

class ProposalInfo extends Component {

  render() {
    const proposalInfo = this.props.proposalInfo;
    const title = proposalInfo.title;
    const type = proposalInfo.type;
    const subtitle = proposalInfo.subtitle;
    const ref = proposalInfo.ref;
    const session = proposalInfo.session;
    const status = proposalInfo.status;
    return (
      <div>
        <h1 className="mb1">
          {subtitle}
        </h1>
        <h2 className="f5 normal ttl small-caps dib mr3 silver">
          <b>Type:</b> {type},
        </h2>
        <h2 className="f5 normal ttl small-caps dib mr3 silver">
          <b>Ref:</b> {ref},
        </h2>
        <h2 className="f5 normal ttl small-caps dib mr3 silver">
          <b>Session:</b> {session},
        </h2>
        <h2 className="f5 normal ttl small-caps dib mr3 silver">
          <b>Status:</b> {status}
        </h2>
        <p className="dark-gray mt2 mb4">
          {title}
        </p>
        <div>
          {this.props.polls.map( (poll) => {
            return <Poll poll = {poll} />
          })}
        </div>
      </div>
    );
  }
}

export default ProposalInfo;
