import R from 'ramda';
import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';

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
      <div className="flex flex-wrap -mx-1 mb-4">
        <div className="w-full md:w-1/2 px-1">
          <span className="block text-center my-2">Kategori:</span>
          <div className="relative">
            <select
              name="category"
              value={this.props.filter.category}
              onChange={this.changeFilter}
              className="w-full appearance-none leading-normal text-grey-dark bg-white border border-grey-lighter shadow pl-2 pr-8 py-1">
              <option>Alle</option>
              {preferenceList.map(item => <option key={item.id}>{item.title}</option>)}
            </select>
            <div className="absolute pin-y pin-r flex items-center px-2">
              <FeatherIcon name="ChevronDown" className="text-grey-dark" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-1">
          <span className="block text-center my-2">Status:</span>
          <div className="relative">
            <select
              name="status"
              value={this.props.filter.status}
              onChange={this.changeFilter}
              className="w-full appearance-none leading-normal text-grey-dark bg-white border border-grey-lighter shadow pl-2 pr-8 py-1">
              <option>Alle</option>
              <option>Fremsat</option>
              <option>Til endelig afstemning</option>
              <option>Afsluttet</option>
            </select>
            <div className="absolute pin-y pin-r flex items-center px-2">
              <FeatherIcon name="ChevronDown" className="text-grey-dark" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
