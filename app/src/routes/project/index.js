import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import R from 'ramda';
import LoadingSpinner from '../../components/loadingSpinner';
import Modal from '../../components/modal';
import ProposalTitle from '../../components/proposalTitle';

class ProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    this.supportProject = this.supportProject.bind(this);
    this.giveDecleration = this.giveDecleration.bind(this);
  }

  async giveDecleration() {
    this.setState({ showModal: false });
    await fetch('/api/user/decleration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
    const newUser = Object.assign({}, this.props.user, { decleration: true });
    console.log(newUser);
    this.props.updateState({ entityType: 'user', entity: newUser });
  }

  async supportProject() {
    if (this.props.anonymousUser) {
      this.props.updateState({ entityType: 'error', entity: 401 });
    } else {
      const project = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.projectList);

      !this.props.user.decleration && !project.isSupporting && this.setState({ showModal: true });

      this.props.updateState({
        entityType: 'projectSupportList',
        entity: { id: project.id, isSupporting: project.isSupporting }
      });

      const response = await fetch(`/api/project/${project.id}/support`, {
        method: 'POST',
        body: JSON.stringify({
          support: !project.isSupporting
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
    const project = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.projectList);
    const user = this.props.user;
    if (project) {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <ProposalTitle title={project.title} />
            <div className="flex flex-wrap md:flex-no-wrap -m-1">
              <div className="w-full m-1">
                <div className="bg-white border border-grey-lighter rounded-sm shadow p-8">
                  <div className="mb-4">
                    <h3>Beskrivelse</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="mb-4">
                    <h3>Budgettering</h3>
                    <p>{project.budget}</p>
                  </div>
                  <div className="mb-4">
                    <h3>Begrundelse og argumentation</h3>
                    <p>{project.argument}</p>
                  </div>
                  <div>
                    <h3>Risiko og udfordringer</h3>
                    <p>{project.risk}</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64 md:flex-no-shrink m-1">
                <div className="bg-white border border-grey-lighter rounded-sm shadow mb-2">
                  <h4 className="text-center border-b border-grey-lighter p-2">Initiativtager</h4>
                  <div className="text-center text-grey-darker p-4">
                    <span className="block mb-4">{project.initiator.name}</span>
                    <span className="block mb-4">{project.initiator.bio}</span>
                    <a href={`mailto:${project.initiator.email}`} className="btn btn-secondary">
                      Kontakt initiativtager
                    </a>
                  </div>
                </div>
                <div className="bg-white border border-grey-lighter rounded-sm shadow mb-2">
                  <h4 className="text-center border-b border-grey-lighter p-2">Projekt</h4>
                  <div className="text-center text-grey-darker p-4">
                    <span className="block mb-4">Kategori: {project.category.title}</span>
                    <span className="block mb-4">Støtter: {project.support} brugere</span>
                    {user && project.initiator.email === user.email ? (
                      <Link to={`${project.id}/edit`} className="btn btn-primary">
                        Rediger projekt
                      </Link>
                    ) : project.isSupporting ? (
                      <button
                        onClick={this.supportProject}
                        onMouseDown={e => e.preventDefault()}
                        className="btn btn-secondary">
                        Træk støtte tilbage
                      </button>
                    ) : (
                      <button
                        onClick={this.supportProject}
                        onMouseDown={e => e.preventDefault()}
                        className="btn btn-primary">
                        Støt projektet
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.showModal && (
            <Modal
              content={
                <div>
                  <h2>Vi har registreret din støtte til projektet</h2>
                  <p>Men for at det kan nå ind i Folketinget, har vi også brug for din vælgererklæring.</p>
                  <p>Så Initiativet kan stille op til næste Folketingsvalg.</p>
                  <div className="mt-6 mb-2">
                    <button onClick={this.giveDecleration} className="btn btn-secondary m-2">
                      Luk vinduet
                    </button>
                    <a
                      href="https://initiativet.dk/sign/forward"
                      target="_decleration"
                      onClick={this.giveDecleration}
                      className="btn btn-primary m-2">
                      Giv en vælgererklæring
                    </a>
                  </div>
                </div>
              }
            />
          )}
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default ProjectPage;
