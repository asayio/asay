import React, { Component } from 'react';
import Nav from '../nav/Nav.js'
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
    if (Object.keys(proposalData).length !== 0)
    {
      return (
        <div>
          <Nav history={this.props.history}/>
          <a href = '../' className="dib link dark-blue hover-blue v-btm mb3">
            <ArrowLeft className="svg-icon mr1" />
            <span className="lh-copy">Tilbage til listen</span>
          </a>
          <div className="pa4 bg-white ba b--light-gray br2">
            <ProposalInfo proposalInfo = {proposalData.proposalInfo} polls = {proposalData.polls} />
            <ProposalArticles articles = {proposalData.articles} />
          </div>
          <a href = '../' className="dib link dark-blue hover-blue v-btm mt3">
            <ArrowLeft className="svg-icon mr1" />
            <span className="lh-copy">Tilbage til listen</span>
          </a>
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
