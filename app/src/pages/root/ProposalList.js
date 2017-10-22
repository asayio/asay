import React, { Component } from 'react';
import ProposalListSection from './ProposalListSection.js';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Alle',
      status: 'Alle',
      history: false,
      subscription: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeSection = this.changeSection.bind(this);
  }

  changeSection(event) {
    const selectedSection = event.target.value
    this.props.updateState({entityType: 'selectedSection', entity: {selectedSection}})
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    });
  }

  render() {
    const proposalList = this.props.proposalList
    const preferenceList = this.props.preferenceList
    const selectedSection = this.props.selectedSection
    const filterSelection = {
      category: this.state.category,
      status: this.state.status,
      history: this.state.history,
      subscription: this.state.subscription,
    }
    return (
      <div className="mw8 center">
        <div>
          <div>
            Kategori: <select name="category" value={this.state.category} onChange={this.handleChange} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                {preferenceList.map((item) =>
                    <option key={item.id}>{item.title}</option>
                )}
            </select>
          </div>
          <div>
            Status: <select name="status" value={this.state.status} onChange={this.handleChange} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                <option>Fremsat</option>
                <option>Til endelig afstemning</option>
                <option>Afsluttet</option>
            </select>
          </div>
          <div>
            <input name="history" type="checkbox" checked={this.state.history} onChange={this.handleChange}/> Forslag jeg har stemt på<br/>
            <input name="subscription" type="checkbox" checked={this.state.subscription} onChange={this.handleChange} /> Forslag jeg abonnerer på
          </div>
        </div>
        <ProposalListSection proposalList={proposalList} filterSelection={filterSelection}/>
      </div>
    )
  }
}

export default Root;
