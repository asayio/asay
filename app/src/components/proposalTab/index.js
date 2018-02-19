import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';

class ProposalTab extends Component {
  render() {
    const tab = this.props.tab;
    const isSelected = this.props.selectedTab === tab.name;
    const className =
      (isSelected ? 'bg-white cursor-auto' : 'bg-grey-lightest hover:shadow-md') +
      ' leading-none w-full sm:w-auto border border-grey-lighter rounded-sm shadow px-4 py-2 mx-1';
    return (
      <button
        onClick={() => this.props.selectTab(tab.name)}
        onMouseDown={e => e.preventDefault()}
        className={className}>
        <FeatherIcon name={tab.icon} className="hidden sm:inline-block mr-2" />
        {tab.name}
      </button>
    );
  }
}

export default ProposalTab;
