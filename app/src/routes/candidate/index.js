import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import R from 'ramda';
import LoadingSpinner from '../../components/loadingSpinner';
import ProposalList from '../../components/proposalList';
import Heading from '../../components/headingWithBackBtn';
import FeatherIcon from '../../components/featherIcon';
import ProposalTabBar from '../../components/proposalTabBar';
import ConfirmationModal from './confirmationModal';
import DeclerationModal from './declerationModal';

class CandidatePage extends Component {
  constructor() {
    super();
    this.state = {};
    this.supportCandidate = this.supportCandidate.bind(this);
    this.supportingCandidate = this.supportingCandidate.bind(this);
    this.giveDecleration = this.giveDecleration.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }

  componentDidMount() {
    const candidate = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.candidateList);
    if (candidate) {
      const tab = (candidate.commitments[0] && candidate.commitments[0].category.title) || undefined;
      this.selectTab(tab);
    }
  }

  selectTab(tabName) {
    this.setState({ selectedTab: tabName });
  }

  async giveDecleration() {
    this.props.updateState({ entityType: 'modal', entity: false });
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

  supportingCandidate(confirmedChange) {
    if (this.props.anonymousUser) {
      this.props.updateState({ entityType: 'modal', entity: 401 });
    } else {
      const user = this.props.user;
      const userSupportsCandidate = user.supportscandidate;
      const candidateId = Number(this.props.match.params.id);
      const candidate = R.find(R.propEq('id', candidateId), this.props.candidateList);
      const isSupporting = candidateId === userSupportsCandidate;
      const mustConfirm = userSupportsCandidate && !isSupporting;
      const newCandidateId = isSupporting ? null : candidateId;
      const confirmationModal = (
        <ConfirmationModal
          candidate={candidate}
          updateState={this.props.updateState}
          supportingCandidate={this.supportingCandidate}
        />
      );
      const declerationModal = (
        <DeclerationModal
          candidate={candidate}
          updateState={this.props.updateState}
          giveDecleration={this.giveDecleration}
        />
      );
      if (!confirmedChange && mustConfirm) {
        this.props.updateState({ entityType: 'modal', entity: { content: confirmationModal } });
      } else {
        !user.decleration && !isSupporting
          ? this.props.updateState({ entityType: 'modal', entity: { content: declerationModal } })
          : this.props.updateState({ entityType: 'modal', entity: false });
        this.supportCandidate(newCandidateId);
      }
    }
  }

  async supportCandidate(candidateId) {
    this.props.updateState({ entityType: 'user', entity: { supportscandidate: candidateId } });
    const response = await fetch(`/api/candidate/${candidateId}/support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
    if (!response.ok) {
      this.props.updateState({ entityType: 'modal', entity: response.status });
    }
  }

  render() {
    const candidate = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.candidateList);
    if (!candidate) {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto text-center">
            <h1>Ups! Der er problemer</h1>
            <p className="mx-auto">Det lader ikke til at kandidaten du leder efter findes.</p>
            <Link to={'/candidates'} className="btn btn-white mt-4 mb-8">
              <FeatherIcon name="ArrowLeft" className="mr-2" />Gå til listen med kandidater
            </Link>
            <p className="mx-auto">
              Burde der være en side her?{' '}
              <a href="mailto:dinevenner@initiativet.dk" className="inline-link">
                Send os en mail
              </a>.
            </p>
          </div>
        </div>
      );
    } else if (candidate) {
      const user = this.props.user;
      const isSupporting = user && candidate.id === user.supportscandidate;
      const tabs = candidate.commitments.map(commitment => {
        return {
          name: commitment.category.title,
          icon: commitment.category.feathericon
        };
      });
      const commitment = R.filter(commitment => commitment.category.title === this.state.selectedTab)(
        candidate.commitments
      )[0];
      const commitmentParagraphs =
        (commitment && R.filter(paragraph => paragraph !== '')(commitment.commitment.split(/\n/))) || [];
      const motivation =
        (candidate.motivation && R.filter(paragraph => paragraph !== '')(candidate.motivation.split(/\n/))) || [];
      const story = (candidate.story && R.filter(paragraph => paragraph !== '')(candidate.story.split(/\n/))) || [];
      const experience =
        (candidate.experience && R.filter(paragraph => paragraph !== '')(candidate.experience.split(/\n/))) || [];
      const threat = (candidate.threat && R.filter(paragraph => paragraph !== '')(candidate.threat.split(/\n/))) || [];
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <Heading title={candidate.firstname + ' ' + candidate.lastname} />
            <div className="flex -m-1">
              <main className="flex-auto m-1">
                <div className="text-center sm:text-left bg-white border border-grey-lighter rounded-sm shadow p-4 md:p-8">
                  <div className="flex flex-col sm:flex-row mb-8">
                    <img
                      src={
                        candidate.picture ? candidate.picture + '?w=256&h=256&fit=fill' : '../../assets/candidate.png'
                      }
                      alt={candidate.firstname + ' ' + candidate.lastname}
                      className="h-24 sm:h-32 w-24 sm:w-32 rounded-sm shadow-md mx-auto sm:mx-0"
                    />
                    <div className="flex flex-col justify-center pt-4 sm:pt-0 sm:pl-8">
                      <span className="text-grey-darkest my-1">
                        <FeatherIcon name="Home" className="text-grey mr-1" />
                        {candidate.constituency ? candidate.constituency.constituency : 'Opstillingskreds ikke valgt'}
                      </span>
                      <ul className="list-reset text-grey-dark -mx-2">
                        {candidate.email && (
                          <li className="inline-block text-grey mx-2 my-1">
                            <FeatherIcon name="Mail" className="mr-1" />
                            <a href={`mailto:${candidate.email}`} target="_mail" className="text-grey-darkest">
                              {candidate.email}
                            </a>
                          </li>
                        )}
                        {candidate.phone && (
                          <li className="inline-block text-grey mx-2 my-1">
                            <FeatherIcon name="Phone" className="mr-1" />
                            <a href={`tel:${candidate.phone}`} target="_phone" className="text-grey-darkest">
                              {candidate.phone}
                            </a>
                          </li>
                        )}
                      </ul>
                      <ul className="list-reset text-grey-dark -mx-2">
                        {candidate.facebook && (
                          <li className="inline-block text-grey mx-2 my-1">
                            <FeatherIcon name="Facebook" className="mr-1" />
                            <a href={candidate.facebook} target="_facebook" className="text-grey-darkest">
                              Facebook
                            </a>
                          </li>
                        )}
                        {candidate.linkedin && (
                          <li className="inline-block text-grey mx-2 my-1">
                            <FeatherIcon name="Linkedin" className="mr-1" />
                            <a href={candidate.linkedin} target="_linkedin" className="text-grey-darkest">
                              LinkedIn
                            </a>
                          </li>
                        )}
                        {candidate.twitter && (
                          <li className="inline-block text-grey mx-2 my-1">
                            <FeatherIcon name="Twitter" className="mr-1" />
                            <a href={candidate.twitter} target="_twitter" className="text-grey-darkest">
                              Twitter
                            </a>
                          </li>
                        )}
                      </ul>
                      <div className="md:hidden py-2">
                        <div className="flex -mx-1 mt-2 mb-4">
                          <a
                            href={`https://facebook.com/sharer/sharer.php?u=https://app.initiativet.dk/candidate/${
                              candidate.id
                            }`}
                            target="_fbshare"
                            rel="noopener noreferrer"
                            className="btn btn-facebook w-full min-w-0 mx-1">
                            Del på Facebook
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?text=Støt%20${candidate.firstname}%20${
                              candidate.lastname
                            }s%20kandidatur%20hos%20Initiativet!&url=https://app.initiativet.dk/candidate/${
                              candidate.id
                            }&via=initiativetdk`}
                            target="_twittershare"
                            rel="noopener noreferrer"
                            className="btn btn-twitter w-full min-w-0 mx-1">
                            Del på Twitter
                          </a>
                        </div>
                        {user && user.id === candidate.id ? (
                          <Link to={`${candidate.id}/edit`} className="btn btn-primary">
                            Rediger kandidatprofil
                          </Link>
                        ) : isSupporting ? (
                          <button onClick={() => this.supportingCandidate(false)} className="btn btn-secondary">
                            Du støtter {candidate.firstname}
                          </button>
                        ) : (
                          <button onClick={() => this.supportingCandidate(false)} className="btn btn-primary">
                            Støt {candidate.firstname}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <article className="mb-4">
                    <h3>Motivation for opstilling</h3>
                    {motivation.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </article>
                  <article className="mb-4">
                    <h3>Baggrund</h3>
                    {story.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </article>
                  <article className="mb-4">
                    <h3>Politisk erfaring</h3>
                    {experience.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </article>
                  <article>
                    <h3>OBS</h3>
                    {threat.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </article>
                </div>
                <div>
                  <h2 className="text-center">Fokusområder</h2>
                  <div className="-mx-1 mb-1">
                    <ProposalTabBar tabs={tabs} selectTab={this.selectTab} selectedTab={this.state.selectedTab} />
                  </div>
                  <div className="bg-white border border-grey-lighter rounded-sm shadow px-4 md:px-8 py-8">
                    {commitmentParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </div>
                </div>
                {candidate.projects.length > 0 && (
                  <div>
                    <h2 className="text-center">Projekter</h2>
                    <ProposalList proposalList={candidate.projects} />
                  </div>
                )}
              </main>
              <div className="hidden md:block w-64 flex-no-shrink m-1">
                <div className="md:sticky md:top-15">
                  <div className="bg-white border border-grey-lighter rounded-sm shadow mb-2">
                    <h4 className="text-center border-b border-grey-lighter p-2">{candidate.support} støttere</h4>
                    {user && user.id === candidate.id ? (
                      <div className="text-center text-grey-darker p-4">
                        {candidate.active ? (
                          <p className="mb-4">
                            Du mangler <b>{candidate.support > 150 ? 'ingen' : 150 - candidate.support}</b> støtter for
                            at blive berettiget til opstilling på Initiativets liste.
                          </p>
                        ) : (
                          <p className="mb-4">Dit kandidatur er ikke offentligt. Kun du kan se denne side.</p>
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
                        {isSupporting ? (
                          <button onClick={() => this.supportingCandidate(false)} className="btn btn-secondary">
                            Du støtter {candidate.firstname}
                          </button>
                        ) : (
                          <button onClick={() => this.supportingCandidate(false)} className="btn btn-primary">
                            Støt {candidate.firstname}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=https://app.initiativet.dk/candidate/${
                      candidate.id
                    }`}
                    target="_fbshare"
                    rel="noopener noreferrer"
                    className="btn btn-facebook w-full mb-2">
                    Del kandidaten på Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=Støt%20${candidate.firstname}%20${
                      candidate.lastname
                    }s%20kandidatur%20hos%20Initiativet!&url=https://app.initiativet.dk/candidate/${
                      candidate.id
                    }&via=initiativetdk`}
                    target="_twittershare"
                    rel="noopener noreferrer"
                    className="btn btn-twitter w-full">
                    Del kandidaten på Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default CandidatePage;
