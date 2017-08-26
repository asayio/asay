import React, { Component } from 'react';
import CommentSection from 'react-disqus-comments';
import Nav from '../nav/Nav';
import ProposalInfo from './ProposalInfo';
import ProposalArticles from './ProposalArticles';
import { ArrowLeft } from 'react-feather';

class ProposalPage extends Component {

  constructor() {
    super();
    this.state = {
      proposalData: {},
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/proposal/${this.props.match.params.id}`);
    const proposalData = await response.json();
    this.setState({proposalData});
  }

  render() {
    const proposalData = this.state.proposalData;
    const proposalInfo = proposalData.proposalInfo;
    if (proposalInfo)
    {
      const proposalValue = proposalInfo.value[0]; // we filter on an ID so there should really only be one element in this array
      return (
        <div>
          <Nav history={this.props.history}/>
          <a href = '../' className="dib link dark-blue hover-blue v-btm mb3">
            <ArrowLeft className="svg-icon mr1" />
            <span className="lh-copy">Tilbage til listen</span>
          </a>
          <div className="pt3 pb4 ph4 bg-white ba b--light-gray br2 shadow-6">
            <ProposalInfo
              proposalInfo = {proposalValue}
              polls = {proposalData.polls}
              attachments = {proposalData.attachments}
            />
            <ProposalArticles articles = {proposalData.articles} proposalInfo = {proposalData.proposalInfo} />
          </div>
          <a href = '../' className="dib link dark-blue hover-blue v-btm mt3">
            <ArrowLeft className="svg-icon mr1" />
            <span className="lh-copy">Tilbage til listen</span>
          </a>
          <CommentSection
            shortname = "asay"
    				identifier = {this.props.match.params.id}
    				title = {proposalValue.titel} />
        </div>
      );
    } else {
      return (
        <div className="tc vh-100 gray">
          Loading ...
        </div>
      );
    }
  }
}

export default ProposalPage;
