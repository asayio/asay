import React, { Component } from 'react';
import ProposalInfo from './ProposalInfo';
import proposalFetcher from '../../fetcher/proposalFetcher.js';
import stageFetcher from '../../fetcher/stageFetcher.js';
import LoadingSpinner from '../../widgets/LoadingSpinner.js';
import OpenDataErrorHandler from '../../widgets/OpenDataErrorHandler.js';
import { Link } from 'react-router-dom';

class ProposalPage extends Component {

  constructor() {
    super();
    this.state = {
      proposalData: '',
      openDataStage: ''
    };
  }

  async componentDidMount() {
    const proposalData = await proposalFetcher({specificProposalId: this.props.match.params.id})
    this.setState({proposalData: proposalData.value[0]});
    const openDataStage = await stageFetcher({specificProposalId: this.props.match.params.id})
    this.setState({openDataStage});
  }

  render() {
    const proposalData = this.state.proposalData;
    if (proposalData.message) { // should extract this to own component along with the one on propsal list
      return (
        <OpenDataErrorHandler/>
      )
    }
    if (proposalData) {
      return (
        <div>
          <div className="mw8 center">
            <ProposalInfo
              proposalInfo = {proposalData}
              openDataStage = {this.state.openDataStage}
            />
            <div className="col12 col9-l tc">
              <Link to={`${this.props.match.params.id}/vote`} target="_blank" className="db dib-l white bg-dark-blue hover-bg-blue mt3 pv2 ph4 ba b--black-10 br1 shadow-6">
                Gå til stemmeboks
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <LoadingSpinner/>
      );
    }
  }
}

export default ProposalPage;
