import React, { Component } from 'react';
// import CommentSection from 'react-disqus-comments';
import ProposalInfo from './ProposalInfo';
import LoadingSpinner from '../widgets/LoadingSpinner.js';
// import ProposalArticles from './ProposalArticles';
import { ArrowLeft, ArrowRight } from 'react-feather';
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
    if (proposalInfo) {
      return (
        <div>
          <Link to="/" className="dib link dark-blue hover-blue mb3">
            <ArrowLeft className="mr1" />
            <span>Tilbage til listen</span>
          </Link>
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
          <a href = '../' className="dib link dark-blue hover-blue mt3">
            <ArrowLeft className="mr1" />
            <span>Tilbage til listen</span>
          </a>
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
