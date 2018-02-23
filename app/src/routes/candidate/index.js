import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import R from 'ramda';
import LoadingSpinner from '../../components/loadingSpinner';
// import Modal from '../../components/modal';
import Heading from '../../components/headingWithBackBtn';
import FeatherIcon from '../../components/featherIcon';

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
    const candidate = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.candidateList);
    const user = this.props.user;
    if (candidate) {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <Heading title={candidate.firstname + ' ' + candidate.lastname} />
            <div className="flex flex-wrap md:flex-no-wrap -m-1">
              <main className="w-full m-1 mt-8 sm:mt-0 md:mt-8">
                <div className="relative bg-white border border-grey-lighter rounded-sm shadow px-4 md:px-8 py-8">
                  <div className="flex flex-wrap items-center md:pl-40 md:-mt-2 mb-8 md:mb-12">
                    <img
                      src={
                        candidate.picture
                          ? candidate.picture
                          : 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png'
                      }
                      alt={candidate.firstname + ' ' + candidate.lastname}
                      className="h-32 w-32 rounded-sm shadow mx-auto sm:mx-0 mb-2 sm:mb-2 md:absolute md:pin-t md:pin-l md:ml-8 -mt-16 sm:mt-0 md:-mt-8"
                    />
                    <div className="w-full sm:w-auto text-center sm:text-left pl-4 md:pl-0">
                      <span className="mb-2">
                        {candidate.constituency
                          ? `Opstilling i ${candidate.constituency.constituency}`
                          : 'Opstillingskreds ikke valgt'}
                      </span>
                      <ul className="list-reset text-grey-dark -mx-2 my-1">
                        {candidate.facebook && (
                          <li className="inline-block mx-2 my-1">
                            <a href={candidate.facebook} target="_facebook" className="hover:text-grey-darkest">
                              <FeatherIcon name="Facebook" className="text-grey-darkest mr-1" />Facebook
                            </a>
                          </li>
                        )}
                        {candidate.linkedin && (
                          <li className="inline-block mx-2 my-1">
                            <a href={candidate.linkedin} target="_linkedin" className="hover:text-grey-darkest">
                              <FeatherIcon name="Linkedin" className="text-grey-darkest mr-1" />LinkedIn
                            </a>
                          </li>
                        )}
                        {candidate.twitter && (
                          <li className="inline-block mx-2 my-1">
                            <a href={candidate.twitter} target="_twitter" className="hover:text-grey-darkest">
                              <FeatherIcon name="Twitter" className="text-grey-darkest mr-1" />Twitter
                            </a>
                          </li>
                        )}
                      </ul>
                      <button className="md:hidden btn btn-primary mt-1">Støt {candidate.firstname}</button>
                    </div>
                  </div>
                  <article className="mb-4">
                    <h3>Motivation for opstilling</h3>
                    <p>{candidate.motivation}</p>
                  </article>
                  <article className="mb-4">
                    <h3>Baggrund</h3>
                    <p>{candidate.story}</p>
                  </article>
                  <article className="mb-4">
                    <h3>Politisk erfaring</h3>
                    <p>{candidate.experience}</p>
                  </article>
                  <article>
                    <h3>OBS</h3>
                    <p>{candidate.threat}</p>
                  </article>
                </div>
              </main>
              <sidebar className="hidden md:block w-64 flex-no-shrink m-1 mt-8">
                <div className="md:sticky md:top-15 bg-white border border-grey-lighter rounded-sm shadow mb-2">
                  <h4 className="text-center border-b border-grey-lighter p-2">{candidate.support} støttere</h4>
                  {user && user.id === candidate.id ? (
                    <div className="text-center text-grey-darker p-4">
                      {candidate.active ? (
                        <p className="mb-4">
                          Du mangler <b>{candidate.support > 150 ? 'ingen' : 150 - candidate.support}</b> støtter for at
                          blive berettiget til opstilling på Initiativets liste.
                        </p>
                      ) : (
                        <p className="mb-4"> 'Dit kandidatur er ikke offentligt. Kun du kan se denne side.</p>
                      )}
                      <Link to={`${candidate.id}/edit`} className="btn btn-primary">
                        Rediger kandidatprofil
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center text-grey-darker p-4">
                      <p className="mb-4">
                        {candidate.firstname} mangler <b>{150 - candidate.support}</b> støtter for at blive berettiget
                        til opstilling på Initiativets liste.
                      </p>
                      <button className="btn btn-primary">Støt {candidate.firstname}</button>
                    </div>
                  )}
                </div>
              </sidebar>
            </div>
          </div>
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default ProjectPage;
