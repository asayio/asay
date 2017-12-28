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
      <div>
        <div>
          <span>Kategori:</span>
          <select name="category" value={this.props.filter.category} onChange={this.changeFilter}>
            <option>Alle</option>
            {preferenceList.map(item => <option key={item.id}>{item.title}</option>)}
          </select>
        </div>
        <div>
          <span>Status:</span>
          <select name="status" value={this.props.filter.status} onChange={this.changeFilter}>
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
