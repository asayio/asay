import React, { Component } from 'react';

class ProposalListSection extends Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      status: [],
      tags: [],
      types: [],
    };
  }

  async componentDidMount() {
    const response = await fetch('/api/lists');
    const filterLists = await response.json();
    const sessions = filterLists.sessions;
    const status = filterLists.status;
    const tags = filterLists.tags;
    const types = filterLists.types;
    this.setState({sessions, status, tags, types});
  }

  render() {
    return (
      <div>
        <select>
          {this.state.sessions.map((session, index) =>
            <option key={session.id}>{session.session}</option>
          )}
        </select>
        <select>
          {this.state.status.map((status, index) =>
            <option key={status.id}>{status.status}</option>
          )}
        </select>
        <select>
          {this.state.tags.map((tag, index) =>
            <option key={tag.id}>{tag.tag}</option>
          )}
        </select>
        <select>
          {this.state.types.map((type, index) =>
            <option key={type.id}>{type.type}</option>
          )}
        </select>
      </div>
    );
  }
}

export default ProposalListSection;
