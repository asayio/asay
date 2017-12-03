import React, { Component } from 'react';
import { File, CheckSquare, AlertCircle, Bookmark } from 'react-feather';
import { Link } from 'react-router-dom';

class ProposalActions extends Component {
  constructor() {
    super();
    this.updateSubscription = this.updateSubscription.bind(this);
  }

  async updateSubscription() {
    const proposal = this.props.proposal;
    const newSubscription = { proposal: proposal.id, subscription: !proposal.isSubscribing };
    this.props.updateState({ entityType: 'subscriptionList', entity: newSubscription });
    const response = await fetch(`/api/proposal/${proposal.id}/subscription`, {
      method: 'POST',
      body: JSON.stringify({
        subscription: !proposal.isSubscribing
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.sessionStorage.authToken
      }
    });
    if (!response.ok) {
      this.props.updateState({ entityType: 'error', entity: true });
    }
  }

  render() {
    const proposal = this.props.proposal;
    const proposalURL =
      proposal.status === 'Afsluttet'
        ? `http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix +
            proposal.numberNumeric +
            proposal.numberPostFix}/${proposal.periodCode}_${proposal.numberPreFix +
            proposal.numberNumeric +
            proposal.numberPostFix}_som_vedtaget.pdf`
        : `http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix +
            proposal.numberNumeric}/${proposal.periodCode}_${proposal.numberPreFix +
            proposal.numberNumeric}_som_fremsat.pdf`;
    return (
      <div className="w-100 w-25-l mt1-l pt4-l pl3-l">
        <div className="sticky-l top-5-l tc">
          <a
            href={proposalURL}
            target={`_${proposal.id}`}
            className="db white bg-dark-blue hover-bg-blue pv2 mv3 mt2-l ba b--black-10 br1 shadow-6">
            <File className="mr2" />
            Læs forslaget
          </a>
          <a
            onClick={this.updateSubscription}
            className={
              proposal.isSubscribing
                ? 'pointer db dark-blue bg-white pv2 mv3 ba b--dark-blue br1'
                : 'pointer db white bg-dark-blue hover-bg-blue pv2 mv3 ba b--black-10 br1 shadow-6'
            }>
            <Bookmark className="mr2" />
            {proposal.isSubscribing ? 'Fjern fra mine forslag' : 'Tilføj til mine forslag'}
          </a>
          {proposal.status !== 'Afsluttet' ? (
            <Link
              to={`${proposal.id}/vote`}
              className={
                proposal.hasVoted
                  ? 'db i-green bg-white pv2 mt3 ba b--i-green br1'
                  : 'db white bg-i-green hover-bg-i-green pv2 mt3 ba b--black-10 br1 shadow-6'
              }>
              <CheckSquare className="mr2" />
              {proposal.hasVoted ? 'Du har stemt' : 'Gå til stemmeboks'}
            </Link>
          ) : (
            <span className="db i-green pv2 mv3 ba b--i-green br1 shadow-6">
              <AlertCircle className="mr2" />
              Afstemning lukket
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default ProposalActions;
