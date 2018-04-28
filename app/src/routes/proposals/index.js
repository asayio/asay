import R from 'ramda';
import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';
import NotificationBox from '../../components/notificationBox';

import FeatherIcon from '../../components/featherIcon';
import { Link } from 'react-router-dom';

class Proposals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitList: true
    };
    this.closeNotificationBox = this.closeNotificationBox.bind(this);
  }

  closeNotificationBox() {
    this.props.updateState({
      entityType: 'user',
      entity: Object.assign({}, this.props.user, { onboardedproposals: true })
    });
    fetch('/api/user/onboarding/proposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
  }

  render() {
    const user = this.props.user;
    const showNotificationBox = user && !user.onboardedproposals && !this.props.anonymousUser;

    let proposalList = this.props.proposalList;
    proposalList = R.filter(proposal => {
      return proposal.isSubscribing;
    }, proposalList);
    proposalList = R.filter(proposal => {
      return !proposal.hasVoted;
    }, proposalList);
    proposalList = R.filter(proposal => {
      return proposal.status !== 'Afsluttet';
    }, proposalList);
    let limitedProposalList = proposalList;
    limitedProposalList = R.filter(proposal => {
      return proposal.distanceToDeadline < 99999999998;
    }, proposalList);
    const limitList =
      this.state.limitList && limitedProposalList.length !== proposalList.length && limitedProposalList.length > 0;

    return (
      <div className="flex-auto px-2">
        {showNotificationBox && (
          <NotificationBox closeNotificationBox={this.closeNotificationBox} title="Aktuelle forslag fra Folketinget">
            <p className="mb-1">
              Her finder du forslag indenfor de emner, du abonnerer på. Når der kommer nye forslag i Folketinget,
              tilføjer vi dem også til din liste. Du kan altid opdatere dine præferencer i menuen oppe i højre hjørne.
            </p>
          </NotificationBox>
        )}
        <div className="max-w-xl mx-auto">
          {!proposalList.length ? (
            <div className="text-center">
              <h1>Her ser lidt tomt ud</h1>
              <p className="mx-auto">Du må hellere opdatere dine præferencer, så vi kan finde nogle forslag til dig.</p>
              <Link to="./preferences">
                <FeatherIcon name="Settings" className="mr-2" />Opdater præferencer
              </Link>
            </div>
          ) : (
            <div>
              <h1>Aktuelle forslag</h1>
              <ProposalList proposalList={limitList ? limitedProposalList : proposalList} />
              <div className="text-center mt-4">
                {limitList && (
                  <button onClick={() => this.setState({ limitList: false })} className="btn btn-white">
                    <FeatherIcon name="ArrowDown" className="mr-2" />Vis forslag uden fastlagt deadline
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Proposals;
