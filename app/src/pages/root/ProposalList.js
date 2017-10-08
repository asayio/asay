import React, { Component } from 'react';
import ProposalListSection from './ProposalListSection.js';
import OpenDataErrorHandler from '../../widgets/OpenDataErrorHandler.js';
import PageControls from '../../widgets/PageControls.js';
import proposalFetcher from '../../fetcher/proposalFetcher.js';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
      selectedSection: 'udvalgte forslag',
      openDataPage: 1
    };
  this.changeSection = this.changeSection.bind(this);
  this.changePage = this.changePage.bind(this);
  this.getProposals = this.getProposals.bind(this);
  }

  async getProposals(options) {
    const proposals = await proposalFetcher(options)
    this.setState({proposals});
  }

  async componentDidMount() {
    const selectedSection = this.state.selectedSection
    this.getProposals({selectedSection});
  };

  async changeSection(event) {
    const selectedSection = event.target.value
    this.setState({
      selectedSection: selectedSection,
      proposals: [],
      openDataPage: 1
    })
    this.getProposals({selectedSection});
  }

  async changePage(event) {
    const page = event.target.value
    const selectedSection = this.state.selectedSection
    this.setState({
      proposals: [],
      openDataPage: page
    })
    this.getProposals({selectedSection, page});
  }

  render() {
    const proposals = this.state.proposals.value && this.state.proposals.value.map(value => {
      return value.Sag || value;
    })
    const nextLink = this.state.proposals['odata.nextLink'];
    const page = Number(this.state.openDataPage); // for some reason it keeps turning into a string :/
    const selectedSection = this.state.selectedSection
    return (
      <div className="mw8 center">
        <div>
          <button value="alle forslag" onClick={this.changeSection}>alle forslag</button>
          <button value="udvalgte forslag" onClick={this.changeSection}>udvalgte forslag</button>
          <button value="afstemte forslag" onClick={this.changeSection}>afstemte forslag</button>
        </div>
        <h1 className="f3 tc mt5 mb4">{selectedSection}</h1>
        <PageControls page={page} nextLink={nextLink} changePage={this.changePage}/>
        {this.state.proposals.message &&
          <OpenDataErrorHandler/>}
        <ProposalListSection proposals = {proposals}/>
        <PageControls page={page} nextLink={nextLink} changePage={this.changePage}/>
      </div>
    )
  }
}

export default Root;
