import Fuse from 'fuse.js';
import R from 'ramda';
import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';
import ProposalListFilter from '../../components/proposalListFilter';
import queryString from 'query-string';

class Projects extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const projectList = [
      { id: 1, shortTitel: 'Forslag 1', category: { feathericon: 'Circle' } },
      { id: 2, shortTitel: 'Forslag 2', category: { feathericon: 'Circle' } }
    ];
    return (
      <div>
        <ProposalListFilter
          updateState={this.props.updateState}
          preferenceList={this.props.preferenceList}
          filter={this.props.filter}
        />
        {projectList.length ? (
          <ProposalList proposalList={projectList} />
        ) : (
          <p>Her ser lidt tomt ud. Prøv at udvide din søgning.</p>
        )}
      </div>
    );
  }
}

export default Projects;
