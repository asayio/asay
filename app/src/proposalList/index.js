import React, { Component } from 'react';
import ProposalListSection from './ProposalList.js';
import Nav from '../nav/Nav.js'

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: {},
      filters: [
        {idName: 'openDataCaseType', name: 'type'},
        {idName: 'openDataPeriod', name: 'periode'},
        {idName: 'openDataStatus', name: 'status'}],
      openDataCaseType: '',
      openDataPeriod: '',
      openDataStatus: ''
    };
  this.handleChange = this.handleChange.bind(this);
  this.getProposals = this.getProposals.bind(this);
  }

  async getProposals() {
    const type = this.state.type;
    const status = this.state.status;
    const session = this.state.periode;
    let filterString = '';
    if (type || status || session) {
      filterString = '&$filter=';
      if (type) {
        filterString += 'typeid eq ' + type;
      }
      if (status) {
        if (filterString !== '&$filter=') {filterString += ' and '}
        filterString += 'statusid eq ' + status;
      }
      if (session) {
        if (filterString !== '&$filter=') {filterString += ' and '}
        filterString += 'periodeid eq ' + session;
      }
    }
    const filter = encodeURIComponent('Sag?$orderby=id desc&$expand=Sagsstatus,Periode' + filterString);
    const proposalResponse = await fetch(`/api/openDataFetcher/fetchOnePage/${filter}`);
    const proposals = await proposalResponse.json();
    this.setState({proposals});
  }

  async componentDidMount() {
    const caseTypeFilter = encodeURIComponent('Sagstype');
    const openDataCaseTypeResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${caseTypeFilter}`);
    const openDataCaseType = await openDataCaseTypeResponse.json();
    this.setState({openDataCaseType});
    const periodFilter = encodeURIComponent('Periode');
    const openDataPeriodResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${periodFilter}`);
    const openDataPeriod = await openDataPeriodResponse.json();
    this.setState({openDataPeriod});
    const statusFilter = encodeURIComponent('Sagsstatus');
    const openDataStatusResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${statusFilter}`);
    const openDataStatus = await openDataStatusResponse.json();
    this.setState({openDataStatus});
    this.getProposals();
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    }, async function () {
      this.getProposals();
    });
  }

  render() {
    var proposals = this.state.proposals.value;
    if (proposals) {
      return (
        <div>
          <Nav history={this.props.history}/>
          <div className="pa4 bg-white ba b--light-gray br2 shadow-6">
            <div className="mb4 cf">
            {this.state.filters.map((filter, index) =>
              <div className="fl w-25 pa1" key={index}>
                <h5 className="mb3 pl1">{filter.name.toUpperCase()}</h5>
                <select name={filter.name} onChange={this.handleChange} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                  <option>Alle</option>
                  {this.state[filter.idName].map((option) =>
                    <option key={option.id} value={option.id}>{option.titel || option.type || option.status}</option>
                  )}
                </select>
              </div>
            )}
            </div>
            <ProposalListSection
              proposals = {proposals}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          loading!
        </div>
      )
    }
  }
}

export default Root;
