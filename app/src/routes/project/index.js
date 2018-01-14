import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import R from 'ramda';
import LoadingSpinner from '../../components/loadingSpinner';

class ProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    this.supportProject = this.supportProject.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  async supportProject() {
    if (this.props.anonymousUser) {
      this.props.updateState({ entityType: 'error', entity: 401 });
    } else {
      const project = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.projectList);
      const response = await fetch(`/api/project/${project.id}/support`, {
        method: 'POST',
        body: JSON.stringify({
          project: !project.isSupporting
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + window.localStorage.authToken
        }
      });
      if (response.ok) {
        !this.props.user.decleration && !project.isSupporting && this.setState({ showModal: true });
        this.props.updateState({ entityType: 'projectSupportList', entity: { project: project.id } });
      } else {
        this.props.updateState({ entityType: 'error', entity: response.status });
      }
    }
  }

  render() {
    const project = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.projectList);
    const user = this.props.user;
    if (project) {
      return (
        <div>
          <div>
            <a onClick={() => window.history.back()}>
              <ArrowLeft />
            </a>
            <h1>{project.title}</h1>
          </div>
          <div>
            <h2>Beskrivelse</h2>
            <p>{project.description}</p>
            <h2>Budgettering</h2>
            <p>{project.budget}</p>
            <h2>Begrundelse og argumentation</h2>
            <p>{project.argument}</p>
            <h2>Risiko og udfordringer</h2>
            <p>{project.risk}</p>
          </div>
          <div>
            <h2>Initiativtager</h2>
            <p>{project.initiator.name}</p>
            <p>{project.initiator.bio}</p>
            <a href={`mailto:${project.initiator.email}`}>Kontakt initiativtager</a>
          </div>
          <div>
            <h2>Projekt</h2>
            <ul>
              <li>Kategori: {project.category.title}</li>
              <li>Støtter: {project.support} brugere</li>
            </ul>
            {user && project.initiator.email === user.email ? (
              <Link to={`${project.id}/edit`}>Rediger projekt</Link>
            ) : project.isSupporting ? (
              <button onClick={this.supportProject}>Træk støtte tilbage</button>
            ) : (
              <button onClick={this.supportProject}>Støt projektet</button>
            )}
          </div>
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default ProjectPage;
