import R from 'ramda';
import React, { Component } from 'react';
import Heading from '../../components/headingWithBackBtn';
import ProposalInfo from '../../components/proposalInfo';
import ProposalActions from '../../components/proposalActions';
import { ArrowLeft } from 'react-feather';
import ProposalTabBar from '../../components/proposalTabBar';
import { Link } from 'react-router-dom';
import ProposalResults from '../../components/proposalResults';

class ProposalPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'Resume'
    };
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(tabName) {
    this.setState({ selectedTab: tabName });
  }

  async seen(proposal) {
    proposal.seeNotification &&
      this.props.updateState(
        { entityType: 'notificationList', entity: { proposal_id: proposal.id, type: 'seen' } },
        await fetch('/api/seen/', {
          method: 'POST',
          body: JSON.stringify({
            proposalId: proposal.id,
            hasResults: !!proposal.results
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.authToken
          }
        })
      );
  }

  render() {
    const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList);
    if (!proposal) {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto text-center">
            <h1>Ups! Der er problemer</h1>
            <p className="mx-auto">Det lader ikke til at forslaget du leder efter findes.</p>
            <Link to={'/proposals'} className="btn btn-white mt-4 mb-8">
              <ArrowLeft className="mr-2" />Gå til listen med forslag
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
    }
    if (!this.props.anonymousUser) {
      this.seen(proposal);
    }
    const resume = proposal.resume ? proposal.resume.split(/\n/gm) : [];
    const presentation = proposal.presentation
      ? proposal.presentation.paragraphs
        ? proposal.presentation.paragraphs.slice(1, 999)
        : proposal.presentation.slice(1, 999)
      : [];
    const proposer = proposal.presentation ? ['Med ord fra ' + proposal.presentation.proposer] : [];
    const purpose = proposer.concat(presentation);
    const tabs = [
      { name: 'Resume', icon: 'FileText' },
      { name: 'Formål', icon: 'FileText' },
      { name: 'Resultater', icon: 'BarChart2' }
    ];
    const results = proposal.results.length && {
      for: R.filter(R.propEq('result', true), proposal.results).length,
      against: R.filter(R.propEq('result', false), proposal.results).length,
      blank: R.filter(R.propEq('result', null), proposal.results).length
    };
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <Heading title={proposal.shortTitel.replace('.', '')} />
          <div className="flex flex-wrap md:flex-no-wrap -m-1">
            <div className="flex flex-col w-full">
              <ProposalTabBar tabs={tabs} selectTab={this.selectTab} selectedTab={this.state.selectedTab} />
              {this.state.selectedTab === 'Resume' && <ProposalInfo paragraphs={resume} />}
              {this.state.selectedTab === 'Formål' && <ProposalInfo paragraphs={purpose} />}
              {this.state.selectedTab === 'Resultater' && (
                <div className="-m-1">
                  {!!results && <ProposalResults titel="Platformens afstemning" results={results} />}
                  {!!proposal.actualResults && (
                    <ProposalResults titel="Folketingets afstemning" results={proposal.actualResults} />
                  )}
                  {!results &&
                    !proposal.actualResults && (
                      <p className="text-grey-dark text-center px-4 mx-auto my-12">
                        Der er desværre ikke kommet nogle resultater for dette forslag endnu.
                      </p>
                    )}
                </div>
              )}
            </div>
            <div className="w-full md:w-64 md:flex-no-shrink m-1">
              <div className="bg-white border border-grey-lighter rounded-sm shadow mb-2">
                <h4 className="text-center border-b border-grey-lighter p-2">Information</h4>
                <div className="text-center text-grey-darker px-4 py-2">
                  <span className="block my-2">
                    <b>Kategori:</b> {proposal.category.title}
                  </span>
                  <span className="block my-2">
                    <b>Deadline:</b> {proposal.deadline}
                  </span>
                  <span className="block my-2">
                    <b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? 'stemme' : 'stemmer'}
                  </span>
                  <span className="block my-2">
                    <b>Detaljer:</b>{' '}
                    <a
                      href={`http://www.ft.dk/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix +
                        proposal.numberNumeric +
                        proposal.numberPostFix}/index.htm`}
                      target={`_${proposal.id}_ft`}
                      className="inline-link">
                      www.ft.dk
                    </a>
                  </span>
                </div>
              </div>
              <div className="md:sticky md:top-15">
                <div className="bg-white border border-grey-lighter rounded-sm shadow">
                  <h4 className="text-center border-b border-grey-lighter p-2">Aktion</h4>
                  <ProposalActions
                    proposal={proposal}
                    anonymousUser={this.props.anonymousUser}
                    updateState={this.props.updateState}
                  />
                </div>
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=https://app.initiativet.dk/proposal/${proposal.id}`}
                  target="_fbshare"
                  rel="noopener noreferrer"
                  className="btn btn-facebook w-full my-2">
                  Del forslaget på Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=Spændende%20forslag%20fra%20Folketinget:%20${proposal.shortTitel.replace(
                    '.',
                    '!'
                  )}&url=https://app.initiativet.dk/proposal/${proposal.id}&via=initiativetdk`}
                  target="_twittershare"
                  rel="noopener noreferrer"
                  className="btn btn-twitter w-full">
                  Del forslaget på Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalPage;
