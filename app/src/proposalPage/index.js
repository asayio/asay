import React, { Component } from 'react';
// import CommentSection from 'react-disqus-comments';
import ProposalInfo from './ProposalInfo';
import LoadingSpinner from '../widgets/LoadingSpinner.js';
import BackBtn from '../widgets/BackBtn.js';
// import ProposalArticles from './ProposalArticles';
import { ArrowRight } from 'react-feather';
import { Link } from 'react-router-dom';

class ProposalPage extends Component {

  constructor() {
    super();
    this.state = {
      proposalData: '',
      openDataCaseType: '',
      openDataPeriod: '',
      openDataStatus: ''
    };
  }

  async componentDidMount() {
    const propsalUrl = encodeURIComponent('Sag?$filter=id%20eq%20' + this.props.match.params.id + '&$expand=Sagsstatus,Periode,Sagstype');
    const response = await fetch(`/api/openDataFetcher/fetchAllPages/${propsalUrl}`);
    const proposalData = await response.json();
    this.setState({proposalData});
    const caseTypeFilter = encodeURIComponent('Sagstype');
    const openDataCaseTypeResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${caseTypeFilter}`);
    const openDataCaseType = await openDataCaseTypeResponse.json();
    this.setState({openDataCaseType});
    const periodFilter = encodeURIComponent('Periode');
    const openDataPeriodResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${periodFilter}`);
    const openDataPeriod = await openDataPeriodResponse.json();
    this.setState({openDataPeriod});
    const statusFilter = encodeURIComponent('Sagsstatus');
    const openDataStatusResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${statusFilter}`);
    const openDataStatus = await openDataStatusResponse.json();
    this.setState({openDataStatus});
  }

  render() {
    const proposalData = this.state.proposalData;
    const proposalInfo = proposalData[0];
    if (proposalData.message) { // should extract this to own component along with the one on propsal list
      return (
        <div>
          <h3>Hov!</h3>
          <p>Noget gik galt i folketingets EDB kælder :(</p>
          <p>Prøv at genindlæse siden</p>
          <button onClick={function() {window.location.reload()}}>Genindlæs siden</button>
          </div>
      )
    }
    if (proposalInfo) {
      return (
        <div>
          <BackBtn title="Tilbage til listen"/>
          <div className="pa4 pb5 bg-white ba b--black-10 br2 shadow-6">
            <ProposalInfo
              proposalInfo = {proposalInfo}
              openDataCaseType = {this.state.openDataCaseType}
              openDataPeriod = {this.state.openDataPeriod}
              openDataStatus = {this.state.openDataStatus}
              polls = {proposalData.polls}
              attachments = {proposalData.attachments}
            />
          { /* <ProposalArticles articles = {proposalData.articles} proposalInfo = {proposalInfo} /> */ }
            <Link to={`${this.props.match.params.id}/vote`} target="_blank" className="pv2 ph3 br1 white bg-i-green link shadow-6 mb5">
              <ArrowRight className="mr2"/>Gå til stemmeboks
            </Link>
          </div>
          <BackBtn title="Tilbage til listen"/>
          { /*
          <CommentSection
            shortname = "asay"
    				identifier = {this.props.match.params.id}
    				title = {proposalInfo.titel} />
          */ }
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
