import R from 'ramda'
import Fuse from 'fuse.js'
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Settings } from 'react-feather';
import FeatherIcon from '../../widgets/FeatherIcon'

class ProposalListSection extends Component {
  render() {
    const proposalList = this.props.proposalList
    const filterSelection = this.props.filterSelection
    const searchString = this.props.searchString
    let filteredProposalList = proposalList
    if (filterSelection.section === "history") {
      filteredProposalList = R.filter(proposal => {
        return proposal.hasVoted
      }, filteredProposalList)
    } else {
      filteredProposalList = R.filter(proposal => {
        return !proposal.hasVoted
      }, filteredProposalList)
    }
    if (filterSelection.section === "all") {
      filteredProposalList = R.sort((a, b) => b.participation - a.participation, filteredProposalList)
    }
    if (filterSelection.section === "personal") {
      filteredProposalList = R.filter(proposal => {
        return proposal.isSubscribing
      }, filteredProposalList)
    }
    if (filterSelection.category !== "Alle") {
      filteredProposalList = R.filter(proposal => {
        return proposal.category.title === filterSelection.category
      }, filteredProposalList)
    }
    if (filterSelection.status !== "Alle") {
      filteredProposalList = R.filter(proposal => {
        return proposal.status === filterSelection.status
      }, filteredProposalList)
    }

    const options = {
      keys: ['shortTitel', 'titel', 'resume', 'presentation.paragraphs'],
      threshold: 0.38, // sweet spot
    }
    const fuse = new Fuse(filteredProposalList, options)
    const searchedProposalList = searchString ? fuse.search(searchString) : filteredProposalList

    if (!searchedProposalList.length && filterSelection.section === "personal") {
      return (
        <div>
          <p>Her ser lidt tomt ud. Du må hellere opdatere dine præferencer, så vi kan finde nogle forslag til dig.</p>
          <Link to="./preferences"><Settings/>Opdater præferencer</Link>
        </div>
      )
    } else if (!searchedProposalList.length && filterSelection.section === "history") {
      return (
        <div>
          <p>Her ser lidt tomt ud. Du må hellere komme i gang med at stemme på nogle forslag.</p>
        </div>
      )
    } else if (!searchedProposalList.length && filterSelection.section === "all") {
      return (
        <div>
          <p>Her ser lidt tomt ud. Prøv at udvid din søgning.</p>
        </div>
      )
    } else {
      return (
        <div>
        {searchedProposalList.map(function (proposal, index) {
          return (
            <Link key={proposal.id} to={`/proposal/${proposal.id}`} className="link black-90">
              <div className="bg-white pa3 pa4-ns mv2 ba b--black-10 br2 card shadow-6 flex">
                <div className="w-20 pr4 tc flex flex-column">
                  <div className="flex-auto pa3 flex items-center justify-center">
                    <FeatherIcon name={proposal.category.feathericon} className="f3 i-green pb1"/>
                  </div>
                  <span>{proposal.category.title}</span>
                </div>
                <div className="w-80">
                  <h3 className="f5 f4-ns hyphen-text mv2">{proposal.shortTitel.replace('.','')}</h3>
                  <p className="f5 ttl small-caps black-70 mv2">
                    <span className="mr2"><b>Kategori:</b> {proposal.category.title}</span>
                    <span className="mr2"><b>Status:</b> {proposal.status}</span>
                    <span className="mr2"><b>Deadline:</b> {proposal.deadline}</span>
                    <span className="mr2"><b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? "stemme" : "stemmer"}</span>
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
