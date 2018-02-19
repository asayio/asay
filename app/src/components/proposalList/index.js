import React, { Component } from 'react';
import ProposalListItem from '../proposalListItem';

class Root extends Component {
  render() {
    return (
      <ul className="list-reset">
        {this.props.proposalList.map(function(proposal, index) {
          return (
            <li key={index}>
              <ProposalListItem proposal={proposal} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Root;
