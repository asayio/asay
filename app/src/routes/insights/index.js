import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';

class Insights extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <ProposalList
        selectedSection={this.props.selectedSection}
        updateState={this.props.updateState}
        preferenceList={this.props.preferenceList}
        searchString={this.props.searchString}
        filter={this.props.filter}
        proposalList={this.props.proposalList}
      />
    );
  }
}

export default Insights;
