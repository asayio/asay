import React, { Component } from 'react';
import CountDown from '../widgets/CountDown';
import {
  Link
} from 'react-router-dom';

class ProposalListSection extends Component {
  render() {
    var proposals = this.props.proposals;
    return (
      <div>
      {proposals.map(function (proposal, index) {
        return (
          <Link key={proposal.id} to={`/proposal/${proposal.id}`} className="link near-black">
            <div className="pt2 pb3 ph3 ba b--light-gray br2 mv3 lh-solid card ma1">
              <h2 className="f3">{proposal.nummer}: {proposal.titelkort}</h2>
              <h3 className="f5 normal small-caps ttl silver mb4">
                <b>Session: </b>{proposal.Periode.titel}
                <b> Status: </b> {proposal.Sagsstatus.status}
                <b> Deadline: </b><CountDown dueDate = {proposal.afgørelsesdato} /><br/>
              </h3>
              <p className="dark-gray">{proposal.title}</p>
            </div>
          </Link>
        );
      })}
      </div>
    );
  }
}

export default ProposalListSection;
