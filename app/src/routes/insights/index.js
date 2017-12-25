import R from 'ramda';
import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';
import { ArrowDown } from 'react-feather';

class Insights extends Component {
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
    const sortProposalList = R.sortWith([R.descend(R.prop('distanceToDeadline'))]);
    let proposalList = this.props.proposalList;
    proposalList = R.filter(proposal => {
      return proposal.hasVoted;
    }, proposalList);
    proposalList = sortProposalList(proposalList);
    let limitedProposalList = proposalList;
    limitedProposalList = R.filter(proposal => {
      return proposal.distanceToDeadline === 99999999999;
    }, proposalList);
    const limitList =
      this.state.limitList && limitedProposalList.length !== proposalList.length && limitedProposalList.length > 0;
    if (!proposalList.length) {
      return (
        <div className="mw8 center mv5 tc flex-auto ">
          <p>Her ser lidt tomt ud. Du må hellere komme i gang med at stemme på nogle forslag.</p>
        </div>
      );
    } else {
      return (
        <div className="mw8 center tc w-100 flex-auto">
          <h1 className="f3 tc mt4 mb3">Historik</h1>
          <ProposalList proposalList={limitList ? limitedProposalList : proposalList} />
          <div className="tc">
            {limitList && (
              <a
                onClick={() => this.setState({ limitList: false })}
                className="pointer db dib-ns white bg-dark-blue hover-bg-blue pv2 ph4 mt2 ba b--black-10 br1 shadow-6">
                <ArrowDown className="mr2" /> Vis forslag med uafsluttet afstemning
              </a>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Insights;
