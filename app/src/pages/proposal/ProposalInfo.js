import React, { Component } from 'react';
import R from 'ramda';
import CountDown from '../../widgets/CountDown.js';
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
    if (proposal.resume === "" && proposal.presentation.paragraphs.length) {this.setState({view:'background'})}
    proposal.presentation.paragraphs && proposal.presentation.paragraphs.splice(-1, 1); // we remove the last annoying paragraph
    proposal.presentation.paragraphs && proposal.presentation.paragraphs.splice(0, 1); // we remove the first annoying paragraph
  }

  render() {
    const proposal = this.props.proposal;
    const ftProposalPassed = proposal.status === "2. beh/Vedtaget" || proposal.status === "Stadfæstet" ? true : false
    const deadline = R.path(['dato'], R.last(proposal.stage))
    const resume = proposal.resume.split(/\n/gm)
    return (
      <div>
        <h1 className="f3 tc mt5 mb3">
          {proposal.number}: {proposal.shortTitel.replace('.', '')}
        </h1>
        <Link to="/" className="db tc dark-blue hover-blue mb4"><ArrowLeft className="mr1"/>Tilbage til listen</Link>
        <a onClick={() => this.setState({view: 'resume'})} className={(this.state.view === 'resume' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 br1 shadow-6 mr2" }><FileText className="mr1"/>Resume</a>
        {proposal.numberPreFix !== 'B' && <a onClick={() => this.setState({view: 'background'})} className={(this.state.view === 'background' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 shadow-6 br1" }><FileText className="mr1"/>Baggrund</a>}
        <div className="row">
          <div className="col12 col9-l bg-white mv2 pa4 ba b--black-10 br1 shadow-6">
            {this.state.view === 'resume' ?
              resume.map(function (paragraph, index) {
                if (!paragraph && !index) {
                  return (
                    <p key={index} className="lh-copy mt0 mb3">Det lader ikke til der er skrevet et resume endnu</p>
                  )
                } else {
                  return (
                    <p key={index} className="lh-copy mt0 mb3">
                      {paragraph}
                    </p>
                  )
                }
              })
              : proposal.presentation.paragraphs.map(function (paragraph, index) {
                return (
                  <p key={index} className="lh-copy mt0 mb3">
                    {paragraph}
                  </p>
                )
              })}
          </div>
          <div className="col12 col3-l tc pl3-l">
            <div className="bg-white lh-copy mv2 pv2 ph4 ba b--black-10 br1 shadow-6">
              <p>
                Deadline: <CountDown dueDate = {deadline} />
              </p>
              <p>Se alle detaljer på <a href={`http://www.ft.dk/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/index.htm`} target={`_${proposal.id}_ft`} className="dark-blue hover-blue">folketings hjemmeside.</a></p>
            </div>
            <a href={`http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric}/${proposal.periodCode}_${proposal.numberPreFix + proposal.numberNumeric}_som_fremsat.pdf`} target={`_${proposal.id}_som_fremsat`} className="dib w-100 pv2 mv2 dark-blue ba b--dark-blue br1 link">
              <Download className="mr2"/>
              Forslag som fremsat
            </a>
            {ftProposalPassed &&
            <a href={`http://www.ft.dk/ripdf/samling/${proposal.periodCode}/${proposal.type}/${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}/${proposal.periodCode}_${proposal.numberPreFix + proposal.numberNumeric + proposal.numberPostFix}_som_vedtaget.pdf`} target={`_${proposal.id}_som_vedtaget`} className="dib w-100 pv2 mv2 dark-blue ba b--dark-blue br1 link">
              <Download className="mr2"/>
              Forslag som vedtaget
            </a>}
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalInfo;
