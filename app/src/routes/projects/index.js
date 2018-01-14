import React, { Component } from 'react';
import R from 'ramda';
import ProposalList from '../../components/proposalList';
import { Link } from 'react-router-dom';

class Projects extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const user = this.props.user ? this.props.user.email : null;
    let projectList = this.props.projectList;
    let userProjectList = projectList;
    userProjectList = R.filter(project => {
      return project.initiator.email === user;
    }, userProjectList);
    projectList = R.filter(project => {
      return project.support > 15; // show only project with support from 15 or more people
    }, projectList);
    projectList = R.difference(projectList, userProjectList);
    return (
      <div>
        {userProjectList.length > 0 && (
          <div>
            <h1>Mine projekter</h1>
            <ProposalList proposalList={userProjectList} />
          </div>
        )}
        <h1>Alle projekter</h1>
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
