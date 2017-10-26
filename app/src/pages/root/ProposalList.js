import R from 'ramda'
import React, { Component } from 'react';
import ProposalListSection from './ProposalListSection.js';
import { Heart, Layers, RotateCcw } from 'react-feather'

class Root extends Component {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.updateSearchString = this.updateSearchString.bind(this);
  }

  changeSection(event) {
    const selectedSection = event.target.name
    this.props.updateState({entityType: 'selectedSection', entity: {selectedSection}})
  }

  changeFilter(event) {
    const target = event.target;
    this.props.updateState({entityType: 'filter', entity: {[target.name]: target.value}})
  }

  updateSearchString(event) {
    const searchString = R.path(['target', 'value'], event)
    this.props.updateState({entityType: 'searchString', entity: {searchString}})
  }

  render() {
    const proposalList = this.props.proposalList
    const preferenceList = this.props.preferenceList
    const filterSelection = {
      category: this.props.filter.category,
      status: this.props.filter.status,
      section: this.props.selectedSection
    }
    return (
      <div className="mw8 center w-100 flex-auto">
        <div className="mv3 mv4-ns">
          <div className="tc flex flex-wrap">
            <div className="w-100 w-third-ns mv1 pr2-ns">
              <a name="personal" onClick={this.changeSection} className={(this.props.selectedSection === 'personal' ? "bg-i-green white cursor-default" : "bg-white pointer")  + " dib w-100 b pa2 ba b--black-10 br1 shadow-6" }><Heart className="mr2"/>Mine forslag</a>
            </div>
            <div className="w-100 w-third-ns mv1 ph1-ns">
              <a name="all" onClick={this.changeSection} className={(this.props.selectedSection === 'all' ? "bg-i-green white cursor-default" : "bg-white pointer")  + " dib w-100 b pa2 ba b--black-10 br1 shadow-6" }><Layers className="mr2"/>Alle forslag</a>
            </div>
            <div className="w-100 w-third-ns mv1 pl2-ns">
              <a name="history" onClick={this.changeSection} className={(this.props.selectedSection === 'history' ? "bg-i-green white cursor-default" : "bg-white pointer")  + " dib w-100 b pa2 ba b--black-10 shadow-6 br1" }><RotateCcw className="mr2"/>Historik</a>
            </div>
          </div>
          <div className="row mb3">
            <div className="col12 col4-ns pv1 pr2-ns">
              <span className="dib b mv2">Søg:</span>
              <input className="clear-sans w-100 pv1 ph2 bg-white ba b--light-gray br2" type="text" onChange={this.updateSearchString} placeholder="Søgeord" value={this.props.searchString}></input>
            </div>
            <div className="col6 col4-ns pv1 pr2 ph1-ns">
              <span className="dib b mv2">Kategori:</span>
              <select name="category" value={this.props.filter.category} onChange={this.changeFilter} className="clear-sans w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                {preferenceList.map((item) =>
                  <option key={item.id}>{item.title}</option>
                )}
              </select>
            </div>
            <div className="col6 col4-ns pv1 pl2">
              <span className="dib b mv2">Status:</span>
              <select name="status" value={this.props.filter.status} onChange={this.changeFilter} className="clear-sans w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                <option>Fremsat</option>
                <option>Til endelig afstemning</option>
                <option>Afsluttet</option>
              </select>
            </div>
          </div>
        </div>
        <ProposalListSection searchString={this.props.searchString} proposalList={proposalList} filterSelection={filterSelection}/>
      </div>
    )
  }
}

export default Root;
