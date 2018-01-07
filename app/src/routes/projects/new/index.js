import React, { Component } from 'react';
import ProjectForm from '../../../components/projectForm';

class NewProjectPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <h1>Opret projekt</h1>
        <ProjectForm preferenceList={this.props.preferenceList} />
      </div>
    );
  }
}

export default NewProjectPage;
