import R from 'ramda';
import React, { Component } from 'react';
import ProposalTitle from '../../components/proposalTitle';
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
    // for a rainy day, when we get results
    // proposal.seeResultsNotification &&
    //   this.props.updateState({
    //     entityType: "notificationList",
    //     entity: { proposal_id: proposal.id, type: "seenResults" }
    //   });
  }

  render() {
    const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList);
    if (!proposal) {
      return (
        <div>
          <div>Det lader ikke til at dette lovforslag findes.</div>
          <div>
            <Link to={`/`} className="pointer dark-blue hover-blue dib mt3">
              <ArrowLeft className="mr2" />Gå til forslagliste
            </Link>
          </div>
        </div>
      );
    }
    if (!this.props.anonymousUser) {
      this.seen(proposal);
    }
    const resume = proposal.resume ? proposal.resume.split(/\n/gm) : [];
    const purpose = proposal.presentation ? proposal.presentation.paragraphs : [];
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
          <ProposalTitle title={proposal.shortTitel.replace('.', '')} />
          <ProposalTabBar tabs={tabs} selectTab={this.selectTab} selectedTab={this.state.selectedTab} />
          <div className="flex flex-wrap md:flex-no-wrap -m-1">
            <div className="w-full">
              {this.state.selectedTab === 'Resume' && <ProposalInfo paragraphs={resume} />}
              {this.state.selectedTab === 'Formål' && <ProposalInfo paragraphs={purpose} />}
              {this.state.selectedTab === 'Resultater' && (
                <div>
                  {results ? (
                    <div className="-m-1">
                      <ProposalResults titel="Platformens afstemning" results={results} />
                      {proposal.actualResults && (
                        <ProposalResults titel="Folketingets afstemning" results={proposal.actualResults} />
                      )}
                    </div>
                  ) : (
                    <div className="bg-white border border-grey-lighter rounded-sm shadow p-8 m-1">
                      <p>Der er desværre ikke kommet nogle resultater for dette forslag endnu.</p>
                    </div>
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
                      className="link">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalPage;
