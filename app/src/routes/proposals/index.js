import R from 'ramda';
import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';

import FeatherIcon from '../../components/featherIcon';
import { Link } from 'react-router-dom';

class Proposals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitList: true
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
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
