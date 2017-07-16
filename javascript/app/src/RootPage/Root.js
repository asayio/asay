import React, { Component } from 'react';
import FilterSection from './FilterSection/FilterSection.js';
import ProposalListSection from './ProposalListSection/ProposalListSection.js';

class Root extends Component {
  render() {
    return (
      <main>
        <FilterSection/>
        <ProposalListSection/>
      </main>
    );
  }
}

export default Root;
