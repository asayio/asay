import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from '../featherIcon';
import ProposalListItemNotification from '../proposalListItemNotification';

class ProposalListItem extends Component {
  render() {
    return (
      <div>
        {this.props.proposalList.map(function(proposal, index) {
          const daysLeftBeforeShowingDeadlineNotification = 1;
          const showDeadlineNotification =
            proposal.distanceToDeadline < 1000 * 60 * 60 * 24 * (daysLeftBeforeShowingDeadlineNotification + 7); // "+1" we need the results one day in advance;
          return (
            <Link key={proposal.id} to={`/proposal/${proposal.id}`}>
              <div className="relative flex flex-wrap bg-white mv2 ba b--black-10 br1 shadow-6 shadow-7-hover">
                <div className="w-100 w-30-m w-20-l tc flex flex-column-ns items-center justify-center br-ns b--black-10 pa3">
                  <FeatherIcon name={proposal.category.feathericon} className="f3 i-green mr2 mr0-ns" />
                  <span className="dib black-50 mt1 mt2-ns">{proposal.category.title}</span>
                </div>
                <div className="w-100 w-60-m w-80-l tc tl-ns lh-title flex flex-column justify-center bt bn-ns b--black-10 pv4 ph3">
                  <h3 className="f5 mt0 mb2">{proposal.shortTitel.replace('.', '')}</h3>
                  <span className="f6 black-70">
                    <span className="mr3">
                      <b>Deadline:</b> {proposal.deadline}
                    </span>
                    <span>
                      <b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? 'stemme' : 'stemmer'}
                    </span>
                  </span>
                </div>
                <div className="absolute flex pa1 top-0 right-0">
                  {showDeadlineNotification && (
                    <ProposalListItemNotification iconName="Clock" labelName="Deadline snart" />
                  )}
                  {proposal.seeNotification && (
                    <ProposalListItemNotification iconName="PlusCircle" labelName="Nyt forslag" />
                  )}
                  {proposal.seeResultsNotification && (
                    <ProposalListItemNotification iconName="PieChart" labelName="Nyt resultater" />
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default ProposalListItem;
