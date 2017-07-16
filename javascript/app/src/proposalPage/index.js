import React, { Component } from 'react';
import ProposalInfo from './ProposalInfo';
import ProposalArticles from './ProposalArticles';
import ProposalPolls from './ProposalPolls';

class ProposalPage extends Component {

  constructor() {
    super();
    this.state = {
      proposalData: {},
    };
  }

  async componentDidMount() {
    const response = await fetch('/api/proposal/1');
    const proposalData = await response.json();
    this.setState({proposalData});
  }

  render() {
    const proposalData = this.state.proposalData;
    if (Object.keys(proposalData).length !== 0)
    {
      return (
        <div className='propsal-page'>
          <ProposalInfo proposalInfo={proposalData.proposalInfo} />
          <ProposalArticles />
          <ProposalPolls />
        </div>
      );
    } else {
      return (
        <div>
          loading...
        </div>
      );
    }
  }
}

export default ProposalPage;
