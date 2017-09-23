import React, { Component } from 'react';
import ProposalInfo from './ProposalInfo';
import LoadingSpinner from '../../widgets/LoadingSpinner.js';
import OpenDataErrorHandler from '../../widgets/OpenDataErrorHandler.js';
import BackBtn from '../../widgets/BackBtn.js';
import { ArrowRight } from 'react-feather';
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
    const proposalUrl = encodeURIComponent('Sag?$filter=id eq ' + this.props.match.params.id + '&$expand=Sagsstatus,Periode,Sagstype');
    const response = await fetch(`/api/openDataFetcher/fetchAllPages/${proposalUrl}`);
    const proposalData = await response.json();
    this.setState({proposalData});
    const proposalStage = encodeURIComponent('Sag(' + this.props.match.params.id + ')/Sagstrin?$filter=typeid eq 7 or typeid eq 17');
    const openDataStageResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${proposalStage}`);
    const openDataStage = await openDataStageResponse.json();
    this.setState({openDataStage});
  }

  render() {
    const proposalData = this.state.proposalData;
    const proposalInfo = proposalData[0];
    if (proposalData.message) { // should extract this to own component along with the one on propsal list
      return (
        <OpenDataErrorHandler/>
      )
    }
    if (proposalInfo) {
      return (
        <div>
          <BackBtn title="Tilbage til listen"/>
          <div className="pa4 pb5 bg-white ba b--black-10 br2 shadow-6">
            <ProposalInfo
              proposalInfo = {proposalInfo}
              openDataStage = {this.state.openDataStage}
            />
            <Link to={`${this.props.match.params.id}/vote`} target="_blank" className="pv2 ph3 br1 white bg-i-green link shadow-6 mb5">
              <ArrowRight className="mr2"/>Gå til stemmeboks
            </Link>
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
