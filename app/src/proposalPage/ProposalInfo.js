import React, { Component } from 'react';
import { DownloadCloud } from 'react-feather';
import LoadingSpinner from '../widgets/LoadingSpinner.js';
// import Poll from '../widgets/poll/Poll';

class ProposalInfo extends Component {
  constructor() {
    super();
    this.state = {
      proposalPresentation: '',
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
    const presentatioStartIndex = proposalPresentation[1]
    this.setState({proposalPresentation: presentatioStartIndex});
  }


  render() {
    const proposal = this.props.proposalInfo;
    const ftProposalPassed = proposal.Sagsstatus.status === "2. beh/Vedtaget" || proposal.Sagsstatus.status === "Stadfæstet" ? true : false
    if (this.props.openDataCaseType && this.props.openDataStatus && this.props.openDataPeriod) {
      return (
        <div className="mb4">
          <h1>
            {proposal.nummer}: {proposal.titelkort}
          </h1>
          <p className="f5 ttl small-caps black-70">
            <span className="mr2"><b>Type:</b> {proposal.Sagstype.type}</span>
            <span className="mr2"><b>Session:</b> {proposal.Periode.titel}</span>
            <span><b>Status:</b> {proposal.Sagsstatus.status}</span>
          </p>
          <p className="black-70 lh-copy mv4">
            {proposal.resume}
          </p>
          <p className="black-70 lh-copy mv4">
            {this.state.proposalPresentation}
          </p>
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
          { /*
          <h3>Relevante dokumenter</h3>
          <ul>{this.props.attachments.map( (attachment) =>
            <li key={attachment.id}><a href={attachment.url} target="_blank">{attachment.title}</a></li>
          )}</ul>
          <br/><h3>Afstemninger</h3>
          {this.props.polls.map( (poll) =>
            <Poll key={poll.status} poll = {poll} proposal = {proposal} />
          )}
          */ }
        </div>
      );
    } else {
      return(
        <LoadingSpinner/>
      )
    }
  }
}

export default ProposalInfo;
