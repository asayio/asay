import React, { Component } from 'react';
import Poll from '../widgets/Poll';

class ProposalPolls extends Component {

  render() {
    return (
      <div>
        {this.props.polls.map((poll) => {
          return <Poll poll = {poll}/>
        })}
      </div>
    );
  }
}

export default ProposalPolls;
