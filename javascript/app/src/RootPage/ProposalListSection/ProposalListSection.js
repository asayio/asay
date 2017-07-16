import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class ProposalListSection extends Component {
  constructor() {
    super();
    this.state = {
      proposalList:[],
    };
  }

  async componentDidMount() {
    const response = await fetch('/api/proposals');
    const proposalList = await response.json();
    this.setState({proposalList});
  }

  render() {
    return (
      <table>
        <tbody>
        {this.state.proposalList.map((proposal, index) =>
          <tr key={proposal.id}>
            <Link to={`/proposal/${proposal.id}`}>
              <td>{proposal.ref} {proposal.subtitle} </td>
              <td>{proposal.session}</td>
              <td>{proposal.status}</td>
              <td>{proposal.duedate}</td>
            </Link>
          </tr>
        )}
        </tbody>
      </table>
    );
  }
}

export default ProposalListSection;
