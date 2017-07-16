import React, { Component } from 'react';

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
      <div className='proposal-info'>
        <h1>
          {title}
        </h1>
        <h2>
          type: {type}
        </h2>
        <h2>
          ref: {ref}
        </h2>
        <h2>
          session: {session}
        </h2>
        <h2>
          status: {status}
        </h2>
        <p>
          {subtitle}
        </p>
      </div>
    );
  }
}

export default ProposalInfo;
