import R from 'ramda'
import React, { Component } from 'react';
import ProposalInfo from './ProposalInfo';
import ProposalActions from './ProposalActions';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import LoadingSpinner from '../../widgets/LoadingSpinner'

class ProposalPage extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList)
    if (proposal) {
      return (
        <div>
          <h1 className="f3 tc mt5 mb3">
            {proposal.shortTitel.replace('.', '')}
          </h1>
          <p className="f5 ttl small-caps black-70 mv2">
            <span className="mr2"><b>Kategori:</b> {proposal.category.title}</span>
            <span className="mr2"><b>Status:</b> {proposal.status}</span>
            <span className="mr2"><b>Deadline:</b> {proposal.deadline}</span>
            <span className="mr2"><b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? "stemme" : "stemmer"}</span>
            <span className="mr2">Se alle detaljer på <a href={`http://www.ft.dk/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/index.htm`} target={`_${proposal.id}_ft`} className="dark-blue hover-blue">folketingets hjemmeside.</a></span>
          </p>
          <Link to="/" className="db tc dark-blue hover-blue mb4"><ArrowLeft className="mr1"/>Tilbage til listen</Link>
          <div className="mw8 center">
            <ProposalInfo
              proposal = {proposal}
            />
          </div>
          <ProposalActions
            proposal = {proposal}
            updateState = {this.props.updateState}
          />
        </div>
      )
    } else {
      return (
        <LoadingSpinner/>
      )
    }

  }
}

export default ProposalPage;
