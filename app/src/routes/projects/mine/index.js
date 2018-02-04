import React, { Component } from 'react';
import R from 'ramda';
import ProposalList from '../../../components/proposalList';
import { Link } from 'react-router-dom';

class Projects extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const user = this.props.user.email;
    let projectList = this.props.projectList;
    projectList = R.filter(project => {
      return project.initiator.email === user;
    }, projectList);
    return (
      <div>
        <h1>Mine projekter</h1>
        <div>
          {user ? (
            <Link to="/projects/new">Opret projekt</Link>
          ) : (
            <button onClick={() => this.props.updateState({ entityType: 'error', entity: 401 })}>Opret projekt</button>
          )}
        </div>
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
