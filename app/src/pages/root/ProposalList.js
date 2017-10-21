import React, { Component } from 'react';
import ProposalListSection from './ProposalListSection.js';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: 'udvalgte forslag',
    };
  this.changeSection = this.changeSection.bind(this);
  }

  changeSection(event) {
    const selectedSection = event.target.value
    this.setState({
      selectedSection: selectedSection,
      openDataPage: 1
    })
  }

  changePage(event) {
    const page = event.target.value
    this.setState({page})
  }

  render() {
    const proposalList = this.props.proposalList
    const selectedSection = this.state.selectedSection
    return (
      <div className="mw8 center">
        <div>
          <button value="alle forslag" onClick={this.changeSection}>alle forslag</button>
          <button value="udvalgte forslag" onClick={this.changeSection}>udvalgte forslag</button>
          <button value="afstemte forslag" onClick={this.changeSection}>afstemte forslag</button>
        </div>
        <h1 className="f3 tc mt5 mb4">{selectedSection}</h1>
        <ProposalListSection proposalList={proposalList} selectedSection={selectedSection}/>
      </div>
    )
  }
}

export default Root;
