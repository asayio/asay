import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from '../featherIcon';
import ProposalListItemNotification from '../proposalListItemNotification';

class ProposalListItem extends Component {
  render() {
    const proposal = this.props.proposal;
    const daysLeftBeforeShowingDeadlineNotification = 1;
    const showDeadlineNotification =
      proposal.distanceToDeadline < 1000 * 60 * 60 * 24 * (daysLeftBeforeShowingDeadlineNotification + 7); // "+1" we need the results one day in advance;
    return (
      <Link key={proposal.id} to={`/proposal/${proposal.id}`}>
        <div>
          <div>
            <FeatherIcon name={proposal.category.feathericon} />
            <span>{proposal.category.title}</span>
          </div>
          <div>
            <h3>{proposal.shortTitel.replace('.', '')}</h3>
            <span>
              <span>
                <b>Deadline:</b> {proposal.deadline}
              </span>
              <span>
                <b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? 'stemme' : 'stemmer'}
              </span>
            </span>
          </div>
          <div>
            {showDeadlineNotification && <ProposalListItemNotification iconName="Clock" labelName="Deadline snart" />}
            {proposal.seeNotification && (
              <ProposalListItemNotification iconName="PlusCircle" labelName="Nyt forslag til dig" />
            )}
            {proposal.seeResultsNotification && (
              <ProposalListItemNotification iconName="PieChart" labelName="Resultater klar" />
            )}
          </div>
        </div>
      </Link>
    );
  }
}

export default ProposalListItem;
