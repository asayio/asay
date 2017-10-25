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
        <div className="mw8 center w-100 flex-auto">
          <div className="tc mt5 mb3">
            <h1 className="f3 mv0">
              {proposal.shortTitel.replace('.', '')}
            </h1>
            <span className="dib black-70 lh-copy mv3">
              <span className="dib mr2"><b>Kategori:</b> {proposal.category.title}</span>
              <span className="dib mr2"><b>Status:</b> {proposal.status}</span>
              <span className="dib mr2"><b>Deadline:</b> {proposal.deadline}</span>
              <span className="dib mr2"><b>Deltagelse:</b> {proposal.participation} {proposal.participation === 1 ? "stemme" : "stemmer"}</span>
              <span className="db mt1">Se alle detaljer på <a href={`http://www.ft.dk/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/index.htm`} target={`_${proposal.id}_ft`} className="dark-blue hover-blue">Folketingets hjemmeside</a>.</span>
            </span>
          </div>
          <div className="row">
            <ProposalInfo
              proposal = {proposal}
            />
            <ProposalActions
              proposal = {proposal}
              updateState = {this.props.updateState}
            />
          </div>
          <div className="w-100 w-75-l mv4 tc">
            <Link to="/" className="dark-blue hover-blue mb4"><ArrowLeft className="mr2"/>Tilbage til listen</Link>
          </div>
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
