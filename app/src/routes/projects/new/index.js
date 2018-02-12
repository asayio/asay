import React, { Component } from 'react';
import ProjectForm from '../../../components/projectForm';

class NewProjectPage extends Component {
  render() {
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <h1>Opret projekt</h1>
          <p className="text-center mx-auto mb-8">
            Du kan altid gemme projektet og vende tilbage senere. Projektet bliver først offentliggjort på
            projektlisten, når du har samlet støtte til det fra mindst 15 andre brugere.
          </p>
          <div className="bg-white border border-grey-lighter rounded-sm shadow p-8">
            <ProjectForm preferenceList={this.props.preferenceList} updateState={this.props.updateState} />
          </div>
        </div>
      </div>
    );
  }
}

export default NewProjectPage;
