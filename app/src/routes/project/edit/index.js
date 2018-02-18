import React, { Component } from 'react';
import R from 'ramda';
import ProjectForm from '../../../components/projectForm';
import { ArrowLeft } from 'react-feather';

class EditProjectPage extends Component {
  render() {
    const project = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.projectList);
    const user = this.props.user;
    if (project.initiator.email === user.email) {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <h1>Rediger projekt</h1>
            <div className="bg-white border border-grey-lighter rounded-sm shadow p-8">
              <ProjectForm
                projectList={this.props.projectList}
                preferenceList={this.props.preferenceList}
                match={this.props.match}
                updateState={this.props.updateState}
                formSubmit={this.formSubmit}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Hovsa...</h1>
          <p>Det er da vist ikke din projekt. Lad hellere initiativtageren stå for redigeringen.</p>
          <a onClick={() => window.history.back()}>
            <ArrowLeft /> Gå tilbage
          </a>
        </div>
      );
    }
  }
}

export default EditProjectPage;
