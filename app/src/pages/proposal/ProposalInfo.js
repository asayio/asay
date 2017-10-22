import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FileText,ArrowLeft,Download } from 'react-feather';

class ProposalInfo extends Component {
  constructor() {
    super();
    this.state = {
      view:'resume',
    };
  }

  async componentDidMount() {
    const proposal = this.props.proposal;
    if (proposal.resume === "" && proposal.presentation.paragraphs.length) {
      this.setState({view:'purpose'})
    }
    proposal.presentation.paragraphs && proposal.presentation.paragraphs.splice(-1, 1); // we remove the last annoying paragraph
    proposal.presentation.paragraphs && proposal.presentation.paragraphs.splice(0, 1); // we remove the first annoying paragraph
  }

  render() {
    const proposal = this.props.proposal;
    const proposalURL = proposal.status === "Afsluttet" ?
      `http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/${proposal.periodCode}_${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}_som_vedtaget.pdf`
      :`http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric}/${proposal.periodCode}_${proposal.numberPreFix + proposal.numberNumeric}_som_fremsat.pdf`
    const resume = proposal.resume.split(/\n/gm)
    const voteStatus = proposal.hasVoted ? 'Du har stemt' : 'Du har ikke stemt'
    return (
      <div>
        <h1 className="f3 tc mt5 mb3">
          {proposal.shortTitel.replace('.', '')}
        </h1>
        <Link to="/" className="db tc dark-blue hover-blue mb4"><ArrowLeft className="mr1"/>Tilbage til listen</Link>
        <a onClick={() => this.setState({view: 'resume'})} className={(this.state.view === 'resume' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 br1 shadow-6 mr2" }><FileText className="mr1"/>Resume</a>
        <a onClick={() => this.setState({view: 'purpose'})} className={(this.state.view === 'purpose' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 shadow-6 br1" }><FileText className="mr1"/>Formål</a>
        <div className="row">
          <div className="col12 col9-l bg-white mv2 pa4 ba b--black-10 br1 shadow-6">
            {this.state.view === 'resume' ?
              resume.map(function (paragraph, index) {
                if (!paragraph && !index) {
                  return (
                    <p key={index} className="lh-copy mt0 mb3">
                      Der findes desværre ikke et resume for dette forslag.
                    </p>
                  )
                } else {
                  return (
                    <p key={index} className="lh-copy mt0 mb3">
                      {paragraph}
                    </p>
                  )
                }
              })
              : proposal.presentation.paragraphs.length > 0 ?
                proposal.presentation.paragraphs.map(function (paragraph, index) {
                  return (
                    <p key={index} className="lh-copy mt0 mb3">
                      {paragraph}
                    </p>
                  )
                }) :
                  <p className="lh-copy mt0 mb3">
                    Der findes desværre ikke en beskrivelse af formålet for dette forslag.
                  </p>
              }
          </div>
          <div className="col12 col3-l tc pl3-l">
            <div className="bg-white lh-copy mv2 pv2 ph4 ba b--black-10 br1 shadow-6">
              <p>
                Deadline: {proposal.deadline}
              </p>
              <p>
                Handling: {voteStatus}
              </p>
              <p>
                Deltagelse: {proposal.participation} stemmer
              </p>
              <p>Se alle detaljer på <a href={`http://www.ft.dk/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/index.htm`} target={`_${proposal.id}_ft`} className="dark-blue hover-blue">folketingets hjemmeside.</a></p>
            </div>
            <a href={proposalURL} target={`_${proposal.id}`} className="dib w-100 pv2 mv2 dark-blue ba b--dark-blue br1 link">
              <Download className="mr2"/>
              Se forslaget
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalInfo;
