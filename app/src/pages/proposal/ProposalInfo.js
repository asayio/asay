  import R from 'ramda'
import React, { Component } from 'react';
import { FileText } from 'react-feather';

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
    console.log(proposal.presentation);
    const resume = proposal.resume.split(/\n/gm)
    return (
      <div className="w-100 w-75-l flex flex-column">
        <div className="flex tc">
          <div className="w-50 w-auto-l">
            <a onClick={() => this.setState({view: 'resume'})} className={(this.state.view === 'resume' ? "bg-white cursor-default" : "bg-near-white pointer")  + " db b ph4 pv2 ba b--black-10 br1 shadow-6 mr2" }><FileText className="mr2"/>Resume</a>
          </div>
          <div className="w-50 w-auto-l">
            <a onClick={() => this.setState({view: 'purpose'})} className={(this.state.view === 'purpose' ? "bg-white cursor-default" : "bg-near-white pointer")  + " db b ph4 pv2 ba b--black-10 br1 shadow-6" }><FileText className="mr2"/>Formål</a>
          </div>
        </div>
        <div className="flex-auto bg-white pa4 ba b--black-10 br1 shadow-6 mt2">
          {R.path(['presentation', 'proposer'], proposal) && this.state.view === 'purpose' &&
            <span className="db b mb3">
              Forslaget blev præsenteret for folketinget af {R.path(['presentation', 'proposer'], proposal)}
            </span>
          }
          {this.state.view === 'resume' ?
            resume.map(function (paragraph, index) {
              if (!paragraph && !index) {
                return (
                  <div>
                    <p key={index} className="lh-copy mt0 mb3">
                      Der findes desværre ikke et resumé for dette forslag endnu.
                    </p>
                    <p className="lh-copy mt0 mb3">
                      Selvom der ikke er blevet skrevet et resumé, kan du stadig læse selve forslaget i PDF-form ved at klikke på 'Læs forslag'-knappen.
                    </p>
                  </div>
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
                <div>
                  <p className="lh-copy mt0 mb3">
                    Der findes desværre ikke en fremlæggelse af baggrunden for dette forslag endnu.
                  </p>
                  <p className="lh-copy mt0 mb3">
                    Selvom der ikke er blevet skrevet en baggrund for forslaget, kan du stadig læse selve forslaget i PDF-form ved at klikke på 'Læs forslag'-knappen.
                  </p>
                </div>
            }
        </div>
      </div>
    );
  }
}

export default ProposalInfo;
