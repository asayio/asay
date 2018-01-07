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
        <p>
          Du kan altid gemme projektet og vende tilbage senere. Projektet vises først i listen når projektet har samlet
          støtte fra mindst 15 andre brugere. Så du kan bare lade være med at sige det til nogen.
        </p>
        <ProjectForm preferenceList={this.props.preferenceList} updateState={this.props.updateState} />
      </div>
    );
  }
}

export default NewProjectPage;
