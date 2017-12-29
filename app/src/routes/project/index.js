import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

class ProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      project: {
        id: 1,
        title: 'Forslag 1',
        category: { name: 'Gourmet', feathericon: 'Circle' },
        description: 'Mega fedt project',
        budget: 'Uh, det bliver dyrt',
        argument: 'det ved jeg sgu ikke',
        risk: 'Ingen risiko. Overhovedet',
        initiator: {
          id: 2,
          name: 'Jens Hansen',
          bio: 'Mega fed fyr',
          email: 'dukanglemmedet@dinmor.org'
        },
        supporters: 100,
        isSupporting: false
      },
      user: { id: 1 }
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
      const project = this.state.project;
      // handling global state missing
      const response = await fetch(`/api/proposal/${project.id}/subscription`, {
        method: 'POST',
        body: JSON.stringify({
          subscription: !project.isSupporting
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + window.localStorage.authToken
        }
      });
      if (!response.ok) {
        this.props.updateState({ entityType: 'error', entity: response.status });
      }
    }
  }

  render() {
    const project = this.state.project;
    const user = this.state.user;
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
            <li>Kategori: {project.category.name}</li>
            <li>Støtter: {project.support} brugere</li>
          </ul>
          {project.initiator.id === user.id ? (
            <Link to={`${project.id}/edit`}>Støt projekt</Link>
          ) : project.isSupporting ? (
            <button onClick={this.supportProject}>Træk støtte tilbage</button>
          ) : (
            <button onClick={this.supportProject}>Støt projektet</button>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectPage;
