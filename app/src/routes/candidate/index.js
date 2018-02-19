import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
    console.log(candidate);
    if (true) {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <Heading title={candidate.firstname + ' ' + candidate.lastname} />
            <div className="flex flex-wrap md:flex-no-wrap -m-1">
              <main className="w-full m-1 md:mt-8">
                <div className="relative bg-white border border-grey-lighter rounded-sm shadow p-8">
                  <img
                    src={candidate.picture}
                    alt={candidate.firstname + ' ' + candidate.lastname}
                    className="absolute pin-t pin-l h-32 w-32 ml-8 -mt-8 rounded-sm shadow"
                  />
                  <div className="pl-40 -mt-2 mb-10">
                    <span className="mb-2">Københavns Omegn</span>
                    <ul className="list-reset text-grey-dark -mx-2">
                      {candidate.facebook && (
                        <li className="inline-block m-2">
                          <a href={candidate.facebook} target="_facebook" className="hover:text-grey-darkest">
                            <FeatherIcon name="Facebook" className="text-grey-darkest mr-1" />Facebook
                          </a>
                        </li>
                      )}
                      {candidate.linkedin && (
                        <li className="inline-block m-2">
                          <a href={candidate.linkedin} target="_linkedin" className="hover:text-grey-darkest">
                            <FeatherIcon name="Linkedin" className="text-grey-darkest mr-1" />LinkedIn
                          </a>
                        </li>
                      )}
                      {candidate.twitter && (
                        <li className="inline-block m-2">
                          <a href={candidate.twitter} target="_twitter" className="hover:text-grey-darkest">
                            <FeatherIcon name="Twitter" className="text-grey-darkest mr-1" />Twitter
                          </a>
                        </li>
                      )}
                    </ul>
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
                  <h4 className="text-center border-b border-grey-lighter p-2">149 støttere</h4>
                  <div className="text-center text-grey-darker p-4">
                    <p className="mb-4">
                      {candidate.firstname} mangler <b>1</b> støtter for at blive berettiget til opstilling på
                      Initiativets liste.
                    </p>
                    <button className="btn btn-primary">Støt {candidate.firstname}</button>
                  </div>
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
