import React, { Component } from 'react';
import { File } from 'react-feather';
// import Poll from '../widgets/poll/Poll';

class ProposalInfo extends Component {
  render() {
    const proposal = this.props.proposalInfo;
    const ftSessionId = proposal.Periode.titel.substr(0,4) + '1';
    const ftProposalId = proposal.nummer.replace(/\s/g,'');
    const ftProposalSplit = ftProposalId.indexOf("A") > -1 || ftProposalId.indexOf("B") > -1 || ftProposalId.indexOf("C") > -1 ? true : false
    const ftProposalIdOriginal = ftProposalSplit ? ftProposalId.substr(0,ftProposalId.length-1) : ftProposalId
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
          <a href={`http://www.ft.dk/ripdf/samling/${ftSessionId}/lovforslag/${ftProposalIdOriginal}/${ftSessionId}_${ftProposalIdOriginal}_som_fremsat.pdf`} target="blank" className="dib link dark-blue hover-blue v-btm mt3">
            <File className="svg-icon mr1" />
            <span className="lh-copy">Forslag som fremsat</span>
          </a><br/>
          <a href={`http://www.ft.dk/ripdf/samling/${ftSessionId}/lovforslag/${ftProposalId}/${ftSessionId}_${ftProposalId}_som_vedtaget.pdf`} target="blank" className="dib link dark-blue hover-blue v-btm mt3">
            <File className="svg-icon mr1" />
            <span className="lh-copy">Forslag som vedtaget</span>
          </a>
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
        <div>
          loading!
        </div>
      )
    }
  }
}

export default ProposalInfo;
