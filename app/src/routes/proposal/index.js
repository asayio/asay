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
    this.seen(proposal);
    return (
      <div className="mw8 center w-100 flex-auto">
        <a
          onClick={() => window.history.back()}
          className="db dib-ns tc white bg-dark-blue hover-bg-blue ba b--black-10 br1 ph3 pv2 mt4">
          <ArrowLeft className="mr2" />Tilbage til listen
        </a>
        <div className="tc tl-ns mv4">
          <h1 className="f3 mt0 mb3">{proposal.shortTitel.replace('.', '')}</h1>
          <div className="black-70 lh-copy">
            <span className="db mt1 dib-ns mr3-ns">
              <b>Kategori:</b> {proposal.category.title}
            </span>
            <span className="db mt1 dib-ns mr3-ns">
              <b>Status:</b> {proposal.status}
            </span>
            <span className="db mt1 dib-ns mr3-ns">
              <b>Deadline:</b> {proposal.deadline}
            </span>
            <span className="db mt1 dib-ns mr3-ns">
              <b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? 'stemme' : 'stemmer'}
            </span>
          </div>
          <span className="black-70 lh-copy db mt1">
            Se alle detaljer på{' '}
            <a
              href={`http://www.ft.dk/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix +
                proposal.numberNumeric +
                proposal.numberPostFix}/index.htm`}
              target={`_${proposal.id}_ft`}
              className="dark-blue hover-blue">
              Folketingets hjemmeside
            </a>.
          </span>
        </div>
        <div className="flex flex-wrap">
          <ProposalInfo proposal={proposal} />
          <ProposalActions proposal={proposal} updateState={this.props.updateState} />
        </div>
      </div>
    );
  }
}

export default ProposalPage;

/* <span className="db mt1">Se alle detaljer på <a href={`http://www.ft.dk/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/index.htm`} target={`_${proposal.id}_ft`} className="dark-blue hover-blue">Folketingets hjemmeside</a>.</span> */
