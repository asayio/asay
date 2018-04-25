import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from '../featherIcon';
import ProposalListItemNotification from '../proposalListItemNotification';

class ProposalListItem extends Component {
  render() {
    const proposal = this.props.proposal;
    const daysLeftBeforeShowingDeadlineNotification = 1;
    const isProject = !!proposal.initiator;
    const showDeadlineNotification =
      proposal.distanceToDeadline < 1000 * 60 * 60 * 24 * (daysLeftBeforeShowingDeadlineNotification + 7); // "+1" we need the results one day in advance;
    return (
      <Link
        key={proposal.id}
        to={isProject ? `/project/${proposal.id}` : `/proposal/${proposal.id}`}
        className="block relative flex flex-col md:flex-row md:h-32 bg-white rounded-sm my-2 shadow hover:shadow-md">
        <div className="flex flex-col justify-center md:w-48 flex-none text-center border-b md:border-b-0 md:border-r border-grey-lighter px-4 py-2">
          <FeatherIcon name={proposal.category.feathericon} className="text-teal text-2xl" />
          <span className="text-grey-dark mt-2">{proposal.category.title}</span>
        </div>
        <div className="flex flex-col justify-center text-center md:text-left p-4 md:pr-16">
          <h4 className="mb-2">{isProject ? proposal.title : proposal.shortTitel.replace('.', '')}</h4>
          {isProject ? (
            <div className="text-sm text-grey-darker">
              <span className="mr-4">
                <b>Oprettet:</b> {proposal.createdon}
              </span>
              <span>
                <b>Støtter:</b> {proposal.support}
              </span>
            </div>
          ) : (
            <div className="text-sm text-grey-darker">
              <span className="mr-4">
                <b>Deadline:</b> {proposal.deadline}
              </span>
              <span>
                <b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? 'stemme' : 'stemmer'}
              </span>
            </div>
          )}
        </div>
        <div className="absolute pin-t pin-r flex leading-none p-1">
          {proposal.seeNotification && <ProposalListItemNotification iconName="PlusCircle" labelName="Nyt forslag" />}
          {showDeadlineNotification && <ProposalListItemNotification iconName="Clock" labelName="Deadline snart" />}
          {proposal.seeResultsNotification && (
            <ProposalListItemNotification iconName="PieChart" labelName="Resultater klar" />
          )}
        </div>
      </Link>
    );
  }
}

export default ProposalListItem;
