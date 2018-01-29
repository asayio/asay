import R from 'ramda';
import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';
import FeatherIcon from '../../components/featherIcon';

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
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto text-center">
            <h1>Her ser lidt tomt ud</h1>
            <p className="mx-auto">Du må hellere komme i gang med at stemme på nogle forslag.</p>
            <button
              onClick={() =>
                this.props.history.replace({
                  pathname: '/'
                })
              }>
              <FeatherIcon name="ArrowDown" />Gå til forsiden
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <h1>Historik</h1>
            <ProposalList proposalList={limitList ? limitedProposalList : proposalList} />
            <div className="text-center mt-4">
              {limitList && (
                <button onClick={() => this.setState({ limitList: false })} className="btn btn-white">
                  <FeatherIcon name="ArrowDown" className="mr-2" />Vis forslag uden fastlagt deadline
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Insights;
