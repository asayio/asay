import R from 'ramda';
import React, { Component } from 'react';
import ProposalInfo from '../../components/proposalInfo';
import ProposalActions from '../../components/proposalActions';
import { ArrowLeft } from 'react-feather';
import ProposalTabBar from '../../components/proposalTabBar';

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

  componentDidMount() {
    window.scrollTo(0, 0);
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
    if (!this.props.anonymousUser) {
      this.seen(proposal);
    }
    const resume = proposal.resume ? proposal.resume.split(/\n/gm) : [];
    const purpose = proposal.presentation ? proposal.presentation.paragraphs : [];
    const tabs = [{ name: 'Resume', icon: 'FileText' }, { name: 'Formål', icon: 'FileText' }];
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <div className="flex flex-wrap sm:flex-no-wrap items-center my-6 sm:my-8">
            <button
              onClick={() => window.history.back()}
              className="sm:flex-none sm:h-9 w-full sm:w-9 sm:text-xl bg-white border border-grey-lighter rounded-sm shadow hover:shadow-md px-3 py-2 sm:px-0 sm:py-0 mb-4 sm:mb-0">
              <ArrowLeft className="sm:leading-none sm:mb-0 mr-2 sm:mr-0" />
              <span className="sm:hidden">Tilbage</span>
            </button>
            <h1 className="flex-auto sm:pl-4 sm:pr-8 my-0">{proposal.shortTitel.replace('.', '')}</h1>
          </div>
          <ProposalTabBar tabs={tabs} selectTab={this.selectTab} selectedTab={this.state.selectedTab} />
          <div className="flex flex-wrap md:flex-no-wrap -m-1">
            <div className="w-full md:w-auto m-1">
              {this.state.selectedTab === 'Resume' && <ProposalInfo paragraphs={resume} />}
              {this.state.selectedTab === 'Formål' && <ProposalInfo paragraphs={purpose} />}
            </div>
            <div className="flex-no-shrink w-full md:w-64 -m-1">
              <div className="md:sticky md:top-15">
                <div className="bg-white border border-grey-lighter rounded-sm shadow m-2">
                  <h4 className="text-center border-b border-grey-lighter p-2">Information</h4>
                  <div className="text-center text-grey-darker p-2">
                    <span className="block my-2">{proposal.category.title}</span>
                    <span className="block my-2">Deadline om {proposal.deadline}</span>
                    <span className="block my-2">
                      {proposal.participation} {proposal.participation === 1 ? 'stemme' : 'stemmer'}
                    </span>
                    <span className="block my-2">
                      Se alle detaljer på:{' '}
                      <a
                        href={`http://www.ft.dk/samling/${proposal.periodCode}/${
                          proposal.type
                        }/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/index.htm`}
                        target={`_${proposal.id}_ft`}
                        className="block link">
                        Folketingets hjemmeside
                      </a>
                    </span>
                  </div>
                </div>
                <div className="bg-white border border-grey-lighter rounded-sm shadow m-2">
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
