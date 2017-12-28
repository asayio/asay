import Fuse from 'fuse.js';
import R from 'ramda';
import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';
import ProposalListFilter from '../../components/proposalListFilter';
import queryString from 'query-string';

class Search extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const filterSelection = {
      category: this.props.filter.category,
      status: this.props.filter.status
    };
    let proposalList = this.props.proposalList;
    if (filterSelection.category !== 'Alle') {
      proposalList = R.filter(proposal => {
        return proposal.category.title === filterSelection.category;
      }, proposalList);
    }
    if (filterSelection.status !== 'Alle') {
      proposalList = R.filter(proposal => {
        return proposal.status === filterSelection.status;
      }, proposalList);
    }
    const parsedParams = queryString.parse(window.location.search);
    const searchString = parsedParams ? parsedParams.v : '';
    const options = {
      keys: ['shortTitel', 'titel', 'resume', 'presentation.paragraphs'],
      threshold: 0.38 // sweet spot
    };
    const fuse = new Fuse(proposalList, options);
    const searchedProposalList = searchString ? fuse.search(searchString) : proposalList;
    return (
      <div>
        <ProposalListFilter
          updateState={this.props.updateState}
          preferenceList={this.props.preferenceList}
          filter={this.props.filter}
        />
        {searchedProposalList.length ? (
          <ProposalList proposalList={searchedProposalList} />
        ) : (
          <p>Her ser lidt tomt ud. Prøv at udvide din søgning.</p>
        )}
      </div>
    );
  }
}

export default Search;
