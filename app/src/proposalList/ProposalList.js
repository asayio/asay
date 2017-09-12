import React, { Component } from 'react';
import CountDown from '../widgets/CountDown';
import {
  Link
} from 'react-router-dom';
import { CheckSquare } from 'react-feather';

class ProposalListSection extends Component {
  render() {
    var proposals = this.props.proposals;
    return (
      <div>
      {proposals.map(function (proposal, index) {
        return (
          <Link key={proposal.id} to={`/proposal/${proposal.id}`} className="link black-90">
            <div className="pv2 ph4 ba b--black-10 br2 mv3 card shadow-6 flex">
              <div className="pr4 flex items-center">
                <CheckSquare className="f3 i-green"/>
              </div>
              <div className="flex-auto">
                <h2 className="f3">{proposal.nummer}: {proposal.titelkort}</h2>
                <p className="f5 ttl small-caps black-50">
                  <span className="mr2"><b>Session:</b> {proposal.Periode.titel}</span>
                  <span className="mr2"><b>Status:</b> {proposal.Sagsstatus.status}</span>
                  <span><b>Deadline:</b> <CountDown dueDate = {proposal.afgørelsesdato} /></span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
      </div>
    );
  }
}

export default ProposalListSection;
