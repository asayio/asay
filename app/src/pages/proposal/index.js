import React, { Component } from 'react';
import ProposalInfo from './ProposalInfo';
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
          <div className="mw8 center">
            <ProposalInfo
              proposalInfo = {proposalInfo}
              openDataStage = {this.state.openDataStage}
            />
            <div className="col9 tc">
              <Link to={`${this.props.match.params.id}/vote`} target="_blank" className="dib link white bg-dark-blue hover-bg-blue mt3 pv3 ph4 ba b--black-10 br1 shadow-6">
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
