import R from 'ramda';
import React, { Component } from 'react';
import { FileText } from 'react-feather';
import VoteResults from './VoteResults';

class ProposalInfo extends Component {
  constructor() {
    super();
    this.state = {
      view: 'resume'
    };
  }

  async componentDidMount() {
    const proposal = this.props.proposal;
    if (proposal.presentation) {
      proposal.presentation.paragraphs && proposal.presentation.paragraphs.splice(-1, 1); // we remove the last annoying paragraph
      proposal.presentation.paragraphs && proposal.presentation.paragraphs.splice(0, 1); // we remove the first annoying paragraph
    }
    if (proposal.resume === '' && proposal.presentation) {
      this.setState({ view: 'purpose' });
    }
  }

  render() {
    const proposal = this.props.proposal;
    const resume = proposal.resume.split(/\n/gm);
    const results = proposal.results.length && {
      for: R.filter(R.propEq('result', true), proposal.results).length,
      against: R.filter(R.propEq('result', false), proposal.results).length,
      blank: R.filter(R.propEq('result', null), proposal.results).length
    }
    return (
      <div className="w-100 w-75-l flex flex-column">
        <div className="flex tc">
          <div className="w-50 w-auto-l">
            <a
              onClick={() => this.setState({ view: 'resume' })}
              className={
                (this.state.view === 'resume' ? 'bg-white cursor-default' : 'bg-near-white pointer') +
                ' db b ph4 pv2 ba b--black-10 br1 shadow-6 mr2'
              }>
              <FileText className="mr2" />Resume
            </a>
          </div>
          <div className="w-50 w-auto-l">
            <a
              onClick={() => this.setState({ view: 'purpose' })}
              className={
                (this.state.view === 'purpose' ? 'bg-white cursor-default' : 'bg-near-white pointer') +
                ' db b ph4 pv2 ba b--black-10 br1 shadow-6'
              }>
              <FileText className="mr2" />Formål
            </a>
          </div>
          {results ? <div className="w-50 w-auto-l">
            <a
              onClick={() => this.setState({ view: 'results' })}
              className={
                (this.state.view === 'results' ? 'bg-white cursor-default' : 'bg-near-white pointer') +
                ' db b ph4 pv2 ba b--black-10 br1 shadow-6'
              }>
              <FileText className="mr2" />Resultat
            </a>
          </div> : null}
        </div>
        <div className="flex-auto bg-white pa4 ba b--black-10 br1 shadow-6 mt2">
          {this.state.view === 'purpose' && (
              proposal.presentation ? (
                <div>
                  {R.path(['presentation', 'proposer'], proposal) &&
                    <span className="lh-copy db b mb3">
                      Forslaget blev præsenteret for folketinget af {R.path(['presentation', 'proposer'], proposal)}
                    </span>}
                  {proposal.presentation.paragraphs.map(function(paragraph, index) {
                    return (
                      <p key={index} className="lh-copy mt0 mb3">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <p className="lh-copy mt0 mb3">
                    Der findes desværre ikke en fremlæggelse af baggrunden for dette forslag endnu.
                  </p>
                  <p className="lh-copy mt0 mb3">
                    Selvom der ikke er blevet skrevet en baggrund for forslaget, kan du stadig læse selve forslaget i
                    PDF-form ved at klikke på 'Læs forslag'-knappen.
                  </p>
                </div>
              ))}
          {this.state.view === 'resume' &&
            resume.map(function(paragraph, index) {
              if (!paragraph && !index) {
                return (
                  <div key={index}>
                    <p className="lh-copy mt0 mb3">
                      Der findes desværre ikke et resumé for dette forslag endnu.
                    </p>
                    <p className="lh-copy mt0 mb3">
                      Selvom der ikke er blevet skrevet et resumé, kan du stadig læse selve forslaget i PDF-form ved at
                      klikke på 'Læs forslag'-knappen.
                    </p>
                  </div>
                );
              } else {
                return (
                  <p key={index} className="lh-copy mt0 mb3">
                    {paragraph}
                  </p>
                );
              }
            })}
          {
            this.state.view === 'results'
              ? <div>
                {results
                  ? <VoteResults titel='Folkets afstemning' results={results}></VoteResults>
                  : null
                }
                {proposal.actualResults
                  ? <VoteResults titel='Folketingets afstemning' results={proposal.actualResults}></VoteResults>
                  : null
                }
              </div>
              : null
          }
        </div>
      </div>
    );
  }
}

export default ProposalInfo;
