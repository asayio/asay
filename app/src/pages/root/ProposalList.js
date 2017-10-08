import React, { Component } from 'react';
import R from 'ramda'
import ProposalListSection from './ProposalListSection.js';
import OpenDataErrorHandler from '../../widgets/OpenDataErrorHandler.js';
import proposalFetcher from '../../fetcher/proposalFetcher.js';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: {},
      selectedSection: 'udvalgte forslag',
      // filters: [
      //   {idName: 'openDataCaseType', name: 'type'},
      //   {idName: 'openDataPeriod', name: 'periode'},
      //   {idName: 'openDataStatus', name: 'status'}],
      // openDataCaseType: '',
      // openDataPeriod: '',
      // openDataStatus: '',
      // openDataPage: 1
    };
  this.handleChange = this.handleChange.bind(this);
  this.getProposals = this.getProposals.bind(this);
  }

  async getProposals(event) {
    const selectedSection = R.path(['target', 'value'], event) || this.state.selectedSection
    const options = {
      selectedSection: selectedSection
      // session: this.state.periode,
      // type: his.state.type,
      // status: this.state.status
    }
    const proposals = await proposalFetcher(options)
    this.setState({proposals});
  }

  async componentDidMount() {
    this.getProposals();
  };

  async handleChange(event) {
    // const target = event.target;
    // const value = target.value;
    // const name = target.name;
    // this.setState({
    //   openDataPage: 1
    // })
    // this.setState({[name]: value});
    this.getProposals(event);
  }

  render() {
    const proposals = this.state.proposals.value;
    // const nextLink = this.state.proposals['odata.nextLink'];
    // const page = Number(this.state.openDataPage); // for some reason it keeps turning into a string :/
    const selectedSection = this.state.selectedSection
    const selectSection = event => {
      const section = event.target.value
      this.setState({
        selectedSection: section,
        proposals: []
      })
      this.handleChange(event)
    }
    return (
      <div className="mw8 center">
        {/* <div className="mb4 cf">
        {this.state.filters.map((filter, index) =>
          <div key={index}>
            <h5>{filter.name.toUpperCase()}</h5>
            <select name={filter.name} onChange={this.handleChange}>
              <option value=''>Alle</option>
              {this.state[filter.idName].map((option) =>
                <option key={option.id} value={option.id}>{option.titel || option.type || option.status}</option>
              )}
            </select>
          </div>
        )}
        </div>*/}
        <div>
          <button value="alle forslag" onClick={selectSection}>alle forslag</button>
          <button value="udvalgte forslag" onClick={selectSection}>udvalgte forslag</button>
          <button value="afstemte forslag" onClick={selectSection}>afstemte forslag</button>
        </div>
        <h1 className="f3 tc mt5 mb4">{selectedSection}</h1>
        {this.state.proposals.message &&
          <OpenDataErrorHandler/>}
        <ProposalListSection proposals = {proposals}/>
        {/* {page >= 2 &&
          <button name='openDataPage' value={page - 1} onClick={this.handleChange}>forrige side</button>}
        {nextLink &&
          <button name='openDataPage' value={page + 1} onClick={this.handleChange}>næste side</button>} */}
      </div>
    )
  }
}

export default Root;
