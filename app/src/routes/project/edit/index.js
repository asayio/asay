import React, { Component } from 'react';
import ProjectForm from '../../../components/projectForm';

class EditProjectPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <h1>Rediger projekt</h1>
        <ProjectForm
          projectList={this.props.projectList}
          preferenceList={this.props.preferenceList}
          match={this.props.match}
        />
      </div>
    );
  }
}

export default EditProjectPage;
