import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';
import ProposalListFilter from '../../components/proposalListFilter';

class Projects extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const projectList = this.props.projectList
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
