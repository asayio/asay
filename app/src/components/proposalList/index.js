import R from 'ramda';
import Fuse from 'fuse.js';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProposalListItem from '../proposalListItem';
import { ArrowDown, Settings } from 'react-feather';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitList: true
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.updateSearchString = this.updateSearchString.bind(this);
  }

  changeSection(event) {
    const selectedSection = event.target.name;
    this.props.updateState({ entityType: 'selectedSection', entity: { selectedSection } });
  }

  changeFilter(event) {
    const target = event.target;
    this.props.updateState({ entityType: 'filter', entity: { [target.name]: target.value } });
  }

  updateSearchString(event) {
    const searchString = R.path(['target', 'value'], event);
    this.props.updateState({ entityType: 'searchString', entity: { searchString } });
  }

  render() {
    const proposalList = this.props.proposalList;
    const filterSelection = {
      category: this.props.filter.category,
      status: this.props.filter.status,
      section: this.props.selectedSection
    };
    const searchString = this.props.searchString;
    let filteredProposalList = proposalList;
    if (filterSelection.section === 'history') {
      filteredProposalList = R.filter(proposal => {
        return proposal.hasVoted;
      }, filteredProposalList);
    }
    if (filterSelection.section === 'personal') {
      filteredProposalList = R.filter(proposal => {
        return proposal.isSubscribing;
      }, filteredProposalList);
      filteredProposalList = R.filter(proposal => {
        return !proposal.hasVoted;
      }, filteredProposalList);
      filteredProposalList = R.filter(proposal => {
        return proposal.status !== 'Afsluttet';
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
    let limitedList = filteredProposalList;
    if (filterSelection.section !== 'history') {
      limitedList = R.filter(proposal => {
        return proposal.distanceToDeadline < 99999999998;
      }, filteredProposalList);
    }
    const showExpandListBtn = limitedList.length === filteredProposalList.length || filterSelection.status !== 'Alle';
    filteredProposalList = this.state.limitList && filterSelection.status === 'Alle' ? limitedList : filteredProposalList;
    const options = {
      keys: ['shortTitel', 'titel', 'resume', 'presentation.paragraphs'],
      threshold: 0.38 // sweet spot
    };
    const fuse = new Fuse(filteredProposalList, options);
    const searchedProposalList = searchString ? fuse.search(searchString) : filteredProposalList;
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
        <div className="mw8 center w-100 flex-auto">
          {searchedProposalList.map(function(proposal, index) {
            return <ProposalListItem key={index} proposal={proposal} />;
          })}
          <div className="tc">
            {this.state.limitList && !showExpandListBtn ? (
              <a
                onClick={() => this.setState({ limitList: false })}
                className="pointer db dib-ns white bg-dark-blue hover-bg-blue pv2 ph4 mt2 ba b--black-10 br1 shadow-6">
                <ArrowDown className="mr2" /> Vis forslag uden fastlagt deadline
              </a>
            ) : (
              <p className="db dib-ns black-50 ma2">Der er desværre ikke flere forslag at vise...</p>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Root;
