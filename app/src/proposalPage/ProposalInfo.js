import React, { Component } from 'react';
import { File } from 'react-feather';
import LoadingSpinner from '../widgets/LoadingSpinner.js';
// import Poll from '../widgets/poll/Poll';

class ProposalInfo extends Component {
  render() {
    const proposal = this.props.proposalInfo;
    const ftProposalPassed = proposal.Sagsstatus.status === "2. beh/Vedtaget" || proposal.Sagsstatus.status === "Stadfæstet" ? true : false
    if (this.props.openDataCaseType && this.props.openDataStatus && this.props.openDataPeriod) {
      return (
        <div>
          <h1 className="mb1">
            {proposal.nummer}: {proposal.titelkort}
          </h1>
          <h2 className="f4 normal ttl small-caps dib mr3 silver">
            <b>Type:</b> {proposal.Sagstype.type}
          </h2>
          <h2 className="f4 normal ttl small-caps dib mr3 silver">
            <b>Session:</b> {proposal.Periode.titel}
          </h2>
          <h2 className="f4 normal ttl small-caps dib mr3 silver">
            <b>Status:</b> {proposal.Sagsstatus.status}
          </h2>
          <p className="dark-gray mt2 mb4">
            {proposal.resume}
          </p>
          <a href={`http://www.ft.dk/ripdf/samling/${proposal.Periode.kode}/${proposal.Sagstype.type}/${proposal.nummerprefix + proposal.nummernumerisk}/${proposal.Periode.kode}_${proposal.nummerprefix + proposal.nummernumerisk}_som_fremsat.pdf`} target="blank" className="dib link dark-blue hover-blue v-btm mt3">
            <File className="svg-icon mr1" />
            <span className="lh-copy">Forslag som fremsat</span>
          </a>
          {ftProposalPassed ?
          <a href={`http://www.ft.dk/ripdf/samling/${proposal.Periode.kode}/${proposal.Sagstype.type}/${proposal.nummerprefix + proposal.nummernumerisk + proposal.nummerpostfix}/${proposal.Periode.kode}_${proposal.nummerprefix + proposal.nummernumerisk + proposal.nummerpostfix}_som_vedtaget.pdf`} target="blank" className="dib link dark-blue hover-blue v-btm mt3">
            <File className="svg-icon mr1" />
            <span className="lh-copy">Forslag som vedtaget</span>
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
