import React, { Component } from 'react';
import R from 'ramda';
import { DownloadCloud } from 'react-feather';
import CountDown from '../../widgets/CountDown.js';

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
    this.setState({proposalPresentation: proposalPresentation});
  }


  render() {
    const proposalPresentation = this.state.proposalPresentation.paragraphs
    proposalPresentation && proposalPresentation.splice(-1, 1); // we remove the last annoying paragraph
    const proposal = this.props.proposalInfo;
    const ftProposalPassed = proposal.Sagsstatus.status === "2. beh/Vedtaget" || proposal.Sagsstatus.status === "Stadfæstet" ? true : false
    const deadline = R.path(['dato'], R.last(this.props.openDataStage));
    return (
      <div className="mb4">
        <h1 className="f3">
          {proposal.nummer}: {proposal.titelkort.replace('.', '')}
        </h1>
        <p className="f5 ttl small-caps black-70">
          <span><b>Deadline:</b> <CountDown dueDate = {deadline} /></span>
        </p>
        <a onClick={() => this.setState({view: 'resume'})}>Forslag</a>
        {proposalPresentation ? <a onClick={() => this.setState({view: 'background'})}>Baggrund</a> : <b/> }
        {this.state.view === 'resume' ?
        <p className="black-70 lh-copy mv4">
          {proposal.resume}
        </p>
        :
        <div>
        {proposalPresentation.map(function (paragraph, index) {
          return (
            <p key={index} className="black-70 lh-copy mv4">
              {paragraph}
            </p>
          )
          })}
        </div>}
        <p>Se alle detaljer på <a href={`http://www.ft.dk/samling/${proposal.Periode.kode}/${proposal.Sagstype.type}/${proposal.nummerprefix + proposal.nummernumerisk + proposal.nummerpostfix}/index.htm`}>ft.dk</a></p>
        <a href={`http://www.ft.dk/ripdf/samling/${proposal.Periode.kode}/${proposal.Sagstype.type}/${proposal.nummerprefix + proposal.nummernumerisk}/${proposal.Periode.kode}_${proposal.nummerprefix + proposal.nummernumerisk}_som_fremsat.pdf`} target="blank" className="pv2 ph3 br1 white bg-dark-blue link shadow-6 mr3">
          <DownloadCloud className="mr2" />
          Forslag som fremsat
        </a>
        {ftProposalPassed ?
        <a href={`http://www.ft.dk/ripdf/samling/${proposal.Periode.kode}/${proposal.Sagstype.type}/${proposal.nummerprefix + proposal.nummernumerisk + proposal.nummerpostfix}/${proposal.Periode.kode}_${proposal.nummerprefix + proposal.nummernumerisk + proposal.nummerpostfix}_som_vedtaget.pdf`} target="blank" className="pv2 ph3 br1 white bg-dark-blue link shadow-6 mr3">
          <DownloadCloud className="mr2" />
          Forslag som vedtaget
        </a>
        :<div/>}
      </div>
    );
  }
}

export default ProposalInfo;
