import React, { Component } from 'react';
import ProposalListItem from '../proposalListItem';

class Root extends Component {
  render() {
    return (
      <div className="mw8 center w-100 flex-auto">
        {this.props.proposalList.map(function(proposal, index) {
          return <ProposalListItem key={index} proposal={proposal} />;
        })}
      </div>
    );
  }
}

export default Root;
