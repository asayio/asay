import React, { Component } from 'react';
import ProposalListSection from './ProposalList.js';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],   session: '',
      statuses: [],   status: '',
      tags: [],       tag: '',
      types: [],      type: '',
    };
  this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/api/lists');
    const filterLists = await response.json();
    const sessions = filterLists.sessions;
    const statuses = filterLists.status;
    const tags = filterLists.tags;
    const types = filterLists.types;
    this.setState({sessions, statuses, tags, types});
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <main>
        <div>
          <select name="session" onChange={this.handleChange} value={this.state.session}>
            {this.state.sessions.map((session, index) =>
              <option key={session.id}>{session.session}</option>
            )}
          </select>
          <select name="status" onChange={this.handleChange} value={this.state.status}>
            {this.state.statuses.map((status, index) =>
              <option key={status.id}>{status.status}</option>
            )}
          </select>
          <select name="tag" onChange={this.handleChange} value={this.state.tag}>
            {this.state.tags.map((tag, index) =>
              <option key={tag.id}>{tag.tag}</option>
            )}
          </select>
          <select name="type" onChange={this.handleChange} value={this.state.type}>
            {this.state.types.map((type, index) =>
              <option key={type.id}>{type.type}</option>
            )}
          </select>
        </div>
        <ProposalListSection
          session = {this.state.session}
          status = {this.state.status}
          tag = {this.state.tag}
          type = {this.state.type}
        />
      </main>
    );
  }
}

export default Root;
