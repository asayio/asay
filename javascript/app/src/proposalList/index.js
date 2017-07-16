import React, { Component } from 'react';
import ProposalListSection from './ProposalList.js';
import Nav from '../nav/Nav.js'
import { ArrowDown } from 'react-feather';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],  filteredProposals: [],
      sessions: [],   session: '',
      statuses: [],   status: '',
      tags: [],       tag: '',
      types: [],      type: '',
    };
  this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const listResponse = await fetch('/api/lists');
    const filterLists = await listResponse.json();
    const sessions = filterLists.sessions;
    const statuses = filterLists.status;
    const tags = filterLists.tags;
    const types = filterLists.types;
    this.setState({sessions, statuses, tags, types});

    const proposalResponse = await fetch('/api/proposals');
    const proposals = await proposalResponse.json();
    const filteredProposals = proposals
    this.setState({proposals, filteredProposals});
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    }, () => {
      const status = this.state.status;
      const session = this.state.session;
      const tag = this.state.tag;
      const type = this.state.type;
      const filteredProposals = this.state.proposals.filter(
        function(proposal) {
          return (status ? proposal.status === status : true)
            && (session ? proposal.session === session : true)
            && (tag ? proposal.tags === tag : true)
            && (type ? proposal.type === type : true);
        }
      );
      this.setState({filteredProposals: filteredProposals});
    });
  }

  render() {
    return (
      <div>
        <Nav history={this.props.history}/>
        <div className="pa4 bg-white ba b--light-gray br2">
          <span className="db mb3">Du kan filtrere her<ArrowDown className="svg-icon ml1" /></span>
          <div className="mb4">
            <select name="session" onChange={this.handleChange} value={this.state.session} className="w-25">
              {this.state.sessions.map((session) =>
                <option key={session.id}>{session.session}</option>
              )}
            </select>
            <select name="status" onChange={this.handleChange} value={this.state.status} className="w-25">
              {this.state.statuses.map((status) =>
                <option key={status.id}>{status.status}</option>
              )}
            </select>
            <select name="tag" onChange={this.handleChange} value={this.state.tag} className="w-25">
              {this.state.tags.map((tag) =>
                <option key={tag.id}>{tag.tag}</option>
              )}
            </select>
            <select name="type" onChange={this.handleChange} value={this.state.type} className="w-25">
              {this.state.types.map((type) =>
                <option key={type.id}>{type.type}</option>
              )}
            </select>
          </div>
          <ProposalListSection
            filteredProposals = {this.state.filteredProposals}
          />
        </div>
      </div>
    );
  }
}

export default Root;
