import R from 'ramda'
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Settings } from 'react-feather';
import FeatherIcon from '../../widgets/FeatherIcon'

class ProposalListSection extends Component {
  render() {
    const proposalList = this.props.proposalList
    const filterSelection = this.props.filterSelection
    let filteredProposalList = []
    filteredProposalList = R.filter(proposal => {
      return (
        proposal.isSubscribing === filterSelection.subscription
        && proposal.hasVoted === filterSelection.history
      )
    }, proposalList)
    if (filterSelection.category !== "Alle") {
      filteredProposalList = R.filter(proposal => {
        return (
          proposal.category.title === filterSelection.category
        )
      }, filteredProposalList)
    }
    if (filterSelection.status !== "Alle") {
      filteredProposalList = R.filter(proposal => {
        return (
          proposal.status === filterSelection.status
        )
      }, filteredProposalList)
    }

    if (!filteredProposalList.length) {
      return (
        <div>
          <p>Her ser lidt tomt ud. Du må hellere opdatere dine præferencer, så vi kan finde nogle forslag til dig.</p>
          <Link to="./preferences"><Settings/>Opdater præferencer</Link>
        </div>
      )
    } else {
      return (
        <div>
        {filteredProposalList.map(function (proposal, index) {
          return (
            <Link key={proposal.id} to={`/proposal/${proposal.id}`} className="link black-90">
              <div className="bg-white pa3 pa4-ns mv2 ba b--black-10 br2 card shadow-6 flex">
                <div className="pr3 pr4-ns flex items-center">
                  <FeatherIcon name={proposal.category.feathericon} className="f3 i-green pb1"/>
                </div>
                <div className="flex-auto">
                  <h3 className="f5 f4-ns hyphen-text mv2">{proposal.shortTitel.replace('.','')}</h3>
                  <p className="f5 ttl small-caps black-70 mv2">
                    <span className="mr2"><b>Kategori:</b> {proposal.category.title}</span>
                    <span className="mr2"><b>Status:</b> {proposal.status}</span>
                    <span className="mr2"><b>Deadline:</b> {proposal.deadline}</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
        </div>
      );
    }
  }
}

export default ProposalListSection;
