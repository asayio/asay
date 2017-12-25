import React, { Component } from 'react';
import ProposalList from '../../components/proposalList';
import ProposalListFilter from '../../components/proposalListFilter';

class Root extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="mw8 center tc w-100 flex-auto">
        <ProposalListFilter
          selectedSection={this.props.selectedSection}
          updateState={this.props.updateState}
          preferenceList={this.props.preferenceList}
          filter={this.props.filter}
        />
        <ProposalList
          selectedSection={this.props.selectedSection}
          updateState={this.props.updateState}
          preferenceList={this.props.preferenceList}
          searchString={this.props.searchString}
          filter={this.props.filter}
          proposalList={this.props.proposalList}
        />
      </div>
    );
  }
}

export default Root;
