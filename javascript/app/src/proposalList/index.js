import React, { Component } from 'react';
import ProposalListSection from './ProposalList.js';
import FilterList from './FilterList.js';
import Nav from '../nav/Nav.js'

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

    //This needs to be in some sort of a constants file
    const all = 'Alle';

    this.setState({
      [name]: value
    }, () => {
      const status = this.state.status;
      const session = this.state.session;
      const tag = this.state.tag;
      const type = this.state.type;
      const filteredProposals = this.state.proposals.filter(
        function(proposal) {
          return (status ? proposal.status === status || status === all : true)
            && (session ? proposal.session === session || session === all : true)
            && (tag ? proposal.tags.find(tagItem => tagItem.tag === tag) != undefined || tag === all : true)
            && (type ? proposal.type === type || type === all : true);
        }
      );
      this.setState({filteredProposals: filteredProposals});
    });
  }

  

  render() {
    return (
      <div>
        <Nav history={this.props.history}/>
        <div className="pa4 bg-white ba b--light-gray br2 shadow-6">
          <h3 className="mb3 pl1">Filtre</h3>
          <div className="mb4 cf">
            <div className="fl w-25 pa1">
              <select name="session" onChange={this.handleChange} value={this.state.session} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                {this.state.sessions.map((session) =>
                  <option key={session.id}>{session.session}</option>
                )}
              </select>
            </div>
            <div className="fl w-25 pa1">
              <select name="status" onChange={this.handleChange} value={this.state.status} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                {this.state.statuses.map((status) =>
                  <option key={status.id}>{status.status}</option>
                )}
              </select>
            </div>
            <div className="fl w-25 pa1">
              <select name="tag" onChange={this.handleChange} value={this.state.tag} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                {this.state.tags.map((tag) =>
                  <option key={tag.id}>{tag.tag}</option>
                )}
              </select>
            </div>
            <div className="fl w-25 pa1">
              <select name="type" onChange={this.handleChange} value={this.state.type} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                {this.state.types.map((type) =>
                  <option key={type.id}>{type.type}</option>
                )}
              </select>
            </div>
          </div>
          <h3 className="pl1">Forslag</h3>
          <ProposalListSection
            filteredProposals = {this.state.filteredProposals}
          />
        </div>
      </div>
    );
  }
}

export default Root;
