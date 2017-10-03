import React, { Component } from 'react';
import R from 'ramda';
import CountDown from '../../widgets/CountDown.js';
import LoadingSpinner from '../../widgets/LoadingSpinner.js';
import {
  Link
} from 'react-router-dom';
import { FileText,ArrowLeft,Download } from 'react-feather';

class ProposalInfo extends Component {
  constructor() {
    super();
    this.state = {
      proposalPresentation: '',
      view:'resume',
    };
  }

  async componentDidMount() {
    const proposal = this.props.proposalInfo;
    const getProposalPresentation = await fetch('/api/ftScraper/', {
      method: 'GET',
      headers: {
        period: proposal.Periode.kode,
        type: proposal.Sagstype.type,
        id: proposal.nummerprefix + proposal.nummernumerisk,
      }
    });
    const proposalPresentation = await getProposalPresentation.json();
    proposalPresentation.paragraphs && proposalPresentation.paragraphs.splice(-1, 1); // we remove the last annoying paragraph
    this.setState({proposalPresentation: proposalPresentation});
  }


  render() {
    const proposalPresentation = this.state.proposalPresentation.paragraphs
    const proposal = this.props.proposalInfo;
    const ftProposalPassed = proposal.Sagsstatus.status === "2. beh/Vedtaget" || proposal.Sagsstatus.status === "Stadfæstet" ? true : false
    const deadline = R.path(['dato'], R.last(this.props.openDataStage));
    return (
      <div>
        <h1 className="f3 tc mt5 mb3">
          {proposal.nummer}: {proposal.titelkort.replace('.', '')}
        </h1>
        <Link to="/" className="db tc dark-blue hover-blue mb4"><ArrowLeft className="mr1"/>Tilbage til listen</Link>
        <a onClick={() => this.setState({view: 'resume'})} className={(this.state.view === 'resume' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 br1 shadow-6 mr2" }><FileText className="mr1"/>Forslag</a>
        {proposal.nummerprefix !== 'B' && <a onClick={() => this.setState({view: 'background'})} className={(this.state.view === 'background' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 shadow-6 br1" }><FileText className="mr1"/>Baggrund</a>}
        <div className="row">
          <div className="col12 col9-l bg-white mv2 pa4 ba b--black-10 br1 shadow-6">
            {this.state.view === 'resume' ?
            <p className="lh-copy mt0 mb3">
              {proposal.resume}
            </p>
            :
            <div>
            {proposalPresentation ? proposalPresentation.map(function (paragraph, index) {
              return (
                <p key={index} className="lh-copy mt0 mb3">
                  {paragraph}
                </p>
              )
            }) : <LoadingSpinner/>}
            </div>}
          </div>
          <div className="col12 col3-l tc pl3-l">
            <div className="bg-white lh-copy mv2 pv2 ph4 ba b--black-10 br1 shadow-6">
              <p>
                Deadline: <CountDown dueDate = {deadline} />
              </p>
              <p>Se alle detaljer på <a href={`http://www.ft.dk/samling/${proposal.Periode.kode}/${proposal.Sagstype.type}/${proposal.nummerprefix + proposal.nummernumerisk + proposal.nummerpostfix}/index.htm`} target="blank" className="dark-blue hover-blue">https://ft.dk</a></p>
            </div>
            <a href={`http://www.ft.dk/ripdf/samling/${proposal.Periode.kode}/${proposal.Sagstype.type}/${proposal.nummerprefix + proposal.nummernumerisk}/${proposal.Periode.kode}_${proposal.nummerprefix + proposal.nummernumerisk}_som_fremsat.pdf`} target="blank" className="dib w-100 pv2 mv2 dark-blue ba b--dark-blue br1 link">
              <Download className="mr2"/>
              Forslag som fremsat
            </a>
            {ftProposalPassed ?
            <a href={`http://www.ft.dk/ripdf/samling/${proposal.Periode.kode}/${proposal.Sagstype.type}/${proposal.nummerprefix + proposal.nummernumerisk + proposal.nummerpostfix}/${proposal.Periode.kode}_${proposal.nummerprefix + proposal.nummernumerisk + proposal.nummerpostfix}_som_vedtaget.pdf`} target="blank" className="dib w-100 pv2 mv2 dark-blue ba b--dark-blue br1 link">
              <Download className="mr2"/>
              Forslag som vedtaget
            </a>
            :<div/>}
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalInfo;
