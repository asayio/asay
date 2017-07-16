import React, { Component } from 'react';
import Nav from '../nav/Nav.js'
import ProposalInfo from './ProposalInfo';
import ProposalArticles from './ProposalArticles';

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
        <div className="mw8 center pt2 ph4 pb4 bg-white ba b--light-gray br2">
          <Nav history={this.props.history}/>
          <ProposalInfo proposalInfo = {proposalData.proposalInfo} polls = {proposalData.polls} />
          <ProposalArticles articles = {proposalData.articles} />
          <a href = '../'>
            Back to list
          </a>
        </div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

export default ProposalPage;
