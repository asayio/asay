import R from 'ramda';
import React, { Component } from 'react';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitList: true
    };
    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(event) {
    const target = event.target;
    this.props.updateState({ entityType: 'filter', entity: { [target.name]: target.value } });
  }

  render() {
    const preferenceList =
      this.props.selectedSection !== 'personal'
        ? this.props.preferenceList
        : R.filter(preference => {
            return preference.preference;
          }, this.props.preferenceList);
    return (
      <div className="flex flex-wrap mb3">
        <div className="w-50 pv1 pl1-ns pr1-ns">
          <span className="dib b mt0 mt2-ns mb2">Kategori:</span>
          <select
            name="category"
            value={this.props.filter.category}
            onChange={this.changeFilter}
            className="clear-sans lh-copy dib w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
            <option>Alle</option>
            {preferenceList.map(item => <option key={item.id}>{item.title}</option>)}
          </select>
        </div>
        <div className="w-50 pv1 pl2-ns">
          <span className="dib b mt0 mt2-ns mb2">Status:</span>
          <select
            name="status"
            value={this.props.filter.status}
            onChange={this.changeFilter}
            className="clear-sans lh-copy dib w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
            <option>Alle</option>
            <option>Fremsat</option>
            <option>Til endelig afstemning</option>
            <option>Afsluttet</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Root;
