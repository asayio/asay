import React, { Component } from 'react';
import R from 'ramda';
import { Link } from 'react-router-dom';
import FeatherIcon from '../../../components/featherIcon';
import ProposalList from '../../../components/proposalList';

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
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <h1>Mine projekter</h1>
          {projectList.length ? (
            <ProposalList proposalList={projectList} />
          ) : (
            <p className="text-center mx-auto my-12">Det ser ikke ud til, at du har oprettet nogle projekter endnu.</p>
          )}
          <div className="text-center my-4">
            {user ? (
              <Link to="/projects/new" className="btn btn-white">
                <FeatherIcon name="PlusCircle" className="mr-2" />Opret projekt
              </Link>
            ) : (
              <button
                onClick={() => this.props.updateState({ entityType: 'error', entity: 401 })}
                className="btn btn-white">
                <FeatherIcon name="PlusCircle" className="mr-2" />Opret projekt
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
