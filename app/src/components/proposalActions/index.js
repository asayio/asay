import React, { Component } from 'react';
import { File, CheckSquare, AlertCircle, Bookmark } from 'react-feather';
import { Link } from 'react-router-dom';

class ProposalActions extends Component {
  constructor() {
    super();
    this.updateSubscription = this.updateSubscription.bind(this);
  }

  async updateSubscription() {
    if (this.props.anonymousUser) {
      this.props.updateState({ entityType: 'error', entity: 401 });
    } else {
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
          Authorization: 'Bearer ' + window.localStorage.authToken
        }
      });
      if (!response.ok) {
        this.props.updateState({ entityType: 'error', entity: response.status });
      }
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
      <div>
        <div>
          <a href={proposalURL} target={`_${proposal.id}`}>
            <File />
            Læs forslaget
          </a>
          <a onClick={this.updateSubscription} className={proposal.isSubscribing ? '' : ''}>
            <Bookmark />
            {proposal.isSubscribing ? 'Fjern fra mine forslag' : 'Tilføj til mine forslag'}
          </a>
          {proposal.status !== 'Afsluttet' ? (
            this.props.anonymousUser ? (
              <a onClick={this.updateSubscription}>
                <CheckSquare />
                Gå til stemmeboks
              </a>
            ) : (
              <Link to={`${proposal.id}/vote`} className={proposal.hasVoted ? '' : ''}>
                <CheckSquare />
                {proposal.hasVoted ? 'Du har stemt' : 'Gå til stemmeboks'}
              </Link>
            )
          ) : (
            <span>
              <AlertCircle />
              Afstemning lukket
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default ProposalActions;
