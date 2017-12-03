import R from 'ramda';
import Fuse from 'fuse.js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'react-feather';
import FeatherIcon from '../../widgets/FeatherIcon';
import ProposalListItemNotification from '../../components/ProposalListItemNotification';

class ProposalListSection extends Component {
  render() {
    const proposalList = this.props.proposalList;
    const filterSelection = this.props.filterSelection;
    const searchString = this.props.searchString;
    let filteredProposalList = proposalList;
    if (filterSelection.section === 'history') {
      filteredProposalList = R.filter(proposal => {
        return proposal.hasVoted;
      }, filteredProposalList);
    } else {
      filteredProposalList = R.filter(proposal => {
        return !proposal.hasVoted;
      }, filteredProposalList);
    }
    if (filterSelection.section === 'personal') {
      filteredProposalList = R.filter(proposal => {
        return proposal.isSubscribing;
      }, filteredProposalList);
    }
    if (filterSelection.category !== 'Alle') {
      filteredProposalList = R.filter(proposal => {
        return proposal.category.title === filterSelection.category;
      }, filteredProposalList);
    }
    if (filterSelection.status !== 'Alle') {
      filteredProposalList = R.filter(proposal => {
        return proposal.status === filterSelection.status;
      }, filteredProposalList);
    }
    if (this.props.limitList) {
      const limitedList = R.filter(proposal => {
        return proposal.distanceToDeadline < 99999999998;
      }, filteredProposalList);
      filteredProposalList = limitedList.length > 0 ? limitedList : filteredProposalList;
    }

    const options = {
      keys: ['shortTitel', 'titel', 'resume', 'presentation.paragraphs'],
      threshold: 0.38 // sweet spot
    };
    const fuse = new Fuse(filteredProposalList, options);
    var searchedProposalList = searchString ? fuse.search(searchString) : filteredProposalList;
    if (!searchedProposalList.length && filterSelection.section === 'personal') {
      return (
        <div className="mw8 center mv5 mv5 tc">
          <p>Her ser lidt tomt ud. Du må hellere opdatere dine præferencer, så vi kan finde nogle forslag til dig.</p>
          <Link
            to="./preferences"
            className="pointer dib white bg-dark-blue hover-bg-blue mv2 pv2 ph4 ba b--black-10 br1 shadow-6">
            <Settings className="mr2" />Opdater præferencer
          </Link>
        </div>
      );
    } else if (!searchedProposalList.length && filterSelection.section === 'history') {
      return (
        <div className="mw8 center mv5 tc">
          <p>Her ser lidt tomt ud. Du må hellere komme i gang med at stemme på nogle forslag.</p>
        </div>
      );
    } else if (!searchedProposalList.length && filterSelection.section === 'all') {
      return (
        <div className="mw8 center mv5 tc">
          <p>Her ser lidt tomt ud. Prøv at udvide din søgning.</p>
        </div>
      );
    } else {
      return (
        <div>
          {searchedProposalList.map(function(proposal, index) {
            const daysLeftBeforeShowingDeadlineNotification = 1;
            const showDeadlineNotification =
              proposal.distanceToDeadline < 1000 * 60 * 60 * 24 * (daysLeftBeforeShowingDeadlineNotification + 7); // "+1" we need the results one day in advance;
            return (
              <Link key={proposal.id} to={`/proposal/${proposal.id}`}>
                <div className="relative flex flex-wrap bg-white mv2 ba b--black-10 br1 card shadow-6">
                  <div className="w-100 w-30-m w-20-l tc flex flex-column items-center justify-center br-ns b--black-10 pa4 pb2 pb4-ns">
                    <FeatherIcon name={proposal.category.feathericon} className="f3 i-green mb2" />
                    <span className="black-50">{proposal.category.title}</span>
                  </div>
                  <div className="w-100 w-70-m w-80-l tc tl-ns flex flex-column justify-center pa4 pt2 pt4-ns">
                    <h3 className="f5 lh-title mt0 mb2">{proposal.shortTitel.replace('.', '')}</h3>
                    <span className="f6 black-70">
                      <span className="mr3">
                        <b>Deadline:</b> {proposal.deadline}
                      </span>
                      <span>
                        <b>Deltagelse:</b> {proposal.participation}{' '}
                        {proposal.participation === 1 ? 'stemme' : 'stemmer'}
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
}

export default ProposalListSection;
