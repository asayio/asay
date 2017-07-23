import React, { Component } from 'react';
import ProposalListSection from './ProposalList.js';
import Nav from '../nav/Nav.js'

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],  filteredProposals: [], filters: [],
      session: '',    status: '',   tag: '',    type: '',
    };
  this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const listResponse = await fetch('/api/lists');
    const filters = await listResponse.json();
    this.setState({filters});

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
      const all = 'Alle';
      const status = this.state.status;
      const session = this.state.session;
      const tag = this.state.tag;
      const type = this.state.type;
      const filteredProposals = this.state.proposals.filter(
        function(proposal) {
          return (status ? proposal.status === status || status === all : true)
            && (session ? proposal.session === session || session === all : true)
            && (tag ? proposal.tags.find(tagItem => tagItem.tag === tag) !== undefined || tag === all : true)
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
          <div className="mb4 cf">
          {this.state.filters.map((filter, index) =>
            <div className="fl w-25 pa1" key={index}>
              <h5 className="mb3 pl1">{filter.name.toUpperCase()}</h5>
              <select name={filter.name} onChange={this.handleChange} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                {filter.options.map((option) =>
                  <option key={option.id}>{option.label}</option>
                )}
              </select>
            </div>
          )}
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
