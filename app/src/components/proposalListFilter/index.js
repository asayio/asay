import R from 'ramda';
import React, { Component } from 'react';
import FormSelect from '../formSelect';

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
    const statusList = [{ title: 'Til afstemning' }, { title: 'Afsluttet' }];
    return (
      <div className="flex flex-wrap -mx-1 -mt-2 mb-4">
        <div className="w-full md:w-1/2 px-1">
          <label className="block text-center my-2">Kategori:</label>
          <FormSelect
            name="category"
            value={this.props.filter.category}
            onChange={this.changeFilter}
            defaultOption="Alle"
            options={preferenceList.map(item => <option key={item.id}>{item.title}</option>)}
          />
        </div>
        <div className="w-full md:w-1/2 px-1">
          <label className="block text-center my-2">Status:</label>
          <FormSelect
            name="status"
            value={this.props.filter.status}
            onChange={this.changeFilter}
            defaultOption="Alle"
            options={statusList.map((item, index) => <option key={index}>{item.title}</option>)}
          />
        </div>
      </div>
    );
  }
}

export default Root;
