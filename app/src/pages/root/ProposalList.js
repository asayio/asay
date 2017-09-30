import React, { Component } from 'react';
import ProposalListSection from './ProposalListItem.js';
import LoadingSpinner from '../../widgets/LoadingSpinner.js';
import OpenDataErrorHandler from '../../widgets/OpenDataErrorHandler.js';

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
      openDataStatus: '',
      openDataPage: 1
    };
  this.handleChange = this.handleChange.bind(this);
  this.getProposals = this.getProposals.bind(this);
  }

  async getProposals() {
    const type = this.state.type;
    const status = this.state.status;
    const session = this.state.periode;
    const page = this.state.openDataPage;
    const hardCodedPropsalList = [
      '70703', // L69
      '72432', // L153
      '73014', // L195
      '71402', // B41
      '73286', // B132
      '71644', // B54
      '72745', // B117
      '71731', // B121
      '72732'  // B110
    ];
    let hardCodedPropsalListUrl = '&$filter=';
    hardCodedPropsalList.forEach(function (id, index) {
      if (index === 0) {
        hardCodedPropsalListUrl += 'id eq ' + id;
      } else {
        hardCodedPropsalListUrl += ' or id eq ' + id;
      }
    })
    let filterString = '&$filter=typeid eq 3 or typeid eq 5'; // default filter
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
    filterString += '&$skip=' + (page - 1) * 20;
    const filter = encodeURIComponent('Sag?$orderby=id desc&$expand=Sagsstatus,Periode' + hardCodedPropsalListUrl);
    const proposalResponse = await fetch(`/api/openDataFetcher/fetchOnePage/${filter}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      }
    );
    const proposals = await proposalResponse.json();
    this.setState({proposals});
  }

  async componentDidMount() {
    const caseTypeFilter = encodeURIComponent('Sagstype');
    const openDataCaseTypeResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${caseTypeFilter}`);
    const openDataCaseTypeAll = await openDataCaseTypeResponse.json();
    const openDataCaseType = openDataCaseTypeAll.filter(function(type) {
      return type.id === 3 || type.id === 5
    })
    this.setState({openDataCaseType});

    const periodFilter = encodeURIComponent(`Periode?$inlinecount=allpages&$filter=type%20eq%20'samling'`);
    const openDataPeriodResponse = await fetch(`/api/openDataFetcher/fetchAllPages/${periodFilter}`);
    const openDataPeriodAll = await openDataPeriodResponse.json();
    openDataPeriodAll.sort(function(b, a) {
      return a.kode.localeCompare(b.kode)
    })
    const openDataPeriod = openDataPeriodAll.filter(function(period) {
      return period.id >= 144 //session: 2016-17
    })
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
      openDataPage: 1
    })
    this.setState({
      [name]: value
    }, async function () {
      this.getProposals();
    });
  }

  render() {
    var proposals = this.state.proposals.value;
    var nextLink = this.state.proposals['odata.nextLink'];
    var page = Number(this.state.openDataPage); // for some reason it keeps turning into a string :/
    if (this.state.proposals.message) {
      return (
        <OpenDataErrorHandler/>
      )
    }
    if (proposals) {
      return (
        <div className="mw8 center">
          <h1 className="f3 tc mt5 mb4">Udvalgte forslag</h1>
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
          </div> */}
          <ProposalListSection
            proposals = {proposals}
          />
        {page >= 2 && <button name='openDataPage' value={page - 1} onClick={this.handleChange}>forrige side</button>}
        {nextLink && <button name='openDataPage' value={page + 1} onClick={this.handleChange}>næste side</button>}
        </div>
      );
    } else {
      return (
        <LoadingSpinner/>
      )
    }
  }
}

export default Root;