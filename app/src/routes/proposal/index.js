import R from 'ramda';
import React, { Component } from 'react';
import ProposalInfo from '../../components/proposalInfo';
import ProposalActions from '../../components/proposalActions';
import { ArrowLeft } from 'react-feather';

class ProposalPage extends Component {
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
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center my-8">
            <button
              onClick={() => window.history.back()}
              className="flex-none h-9 w-9 text-xl bg-white border border-grey-lighter rounded-sm shadow hover:shadow-md">
              <ArrowLeft className="leading-none mb-0" />
            </button>
            <h1 className="flex-auto pl-4 pr-8 my-0">{proposal.shortTitel.replace('.', '')}</h1>
          </div>
          <div className="flex -mx-2">
            <div className="w-3/4 mx-2">
              <ProposalInfo proposal={proposal} />
            </div>
            <div className="w-1/4 mx-2">
              <div className="bg-white border border-grey-lighter rounded-sm shadow">
                <ProposalActions
                  proposal={proposal}
                  anonymousUser={this.props.anonymousUser}
                  updateState={this.props.updateState}
                />
                <div>
                  <span>
                    <b>Kategori:</b> {proposal.category.title}
                  </span>
                  <span>
                    <b>Status:</b> {proposal.status}
                  </span>
                  <span>
                    <b>Deadline:</b> {proposal.deadline}
                  </span>
                  <span>
                    <b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? 'stemme' : 'stemmer'}
                  </span>
                </div>
                <span>
                  Se alle detaljer på{' '}
                  <a
                    href={`http://www.ft.dk/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix +
                      proposal.numberNumeric +
                      proposal.numberPostFix}/index.htm`}
                    target={`_${proposal.id}_ft`}>
                    Folketingets hjemmeside
                  </a>.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalPage;
