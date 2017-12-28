import R from 'ramda';
import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';
import { ArrowDown, Settings } from 'react-feather';
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
    if (!proposalList.length) {
      return (
        <div>
          <p>Her ser lidt tomt ud. Du må hellere opdatere dine præferencer, så vi kan finde nogle forslag til dig.</p>
          <Link to="./preferences">
            <Settings />Opdater præferencer
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Aktuelle forslag</h1>

          <ProposalList proposalList={limitList ? limitedProposalList : proposalList} />
          <div>
            {limitList && (
              <a onClick={() => this.setState({ limitList: false })}>
                <ArrowDown /> Vis forslag uden fastlagt deadline
              </a>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Proposals;
