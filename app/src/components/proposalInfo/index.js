import R from 'ramda';
import React, { Component } from 'react';
import { FileText } from 'react-feather';

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
    return (
      <div>
        <div className="-mx-1 mb-2">
          <button
            onClick={() => this.setState({ view: 'resume' })}
            className={
              (this.state.view === 'resume' ? 'bg-white cursor-auto' : 'bg-grey-lightest hover:shadow-md') +
              ' leading-none border border-grey-lighter rounded-sm shadow no-outline px-4 py-2 mx-1'
            }>
            <FileText className="mr-2" />Resume
          </button>
          <button
            onClick={() => this.setState({ view: 'purpose' })}
            className={
              (this.state.view === 'purpose' ? 'bg-white cursor-auto' : 'bg-grey-lightest hover:shadow-md') +
              ' leading-none border border-grey-lighter rounded-sm shadow no-outline px-4 py-2 mx-1'
            }>
            <FileText className="mr-2" />Formål
          </button>
        </div>
        <div className="bg-white border border-grey-lighter rounded-sm shadow px-8 pt-6 pb-4">
          {R.path(['presentation', 'proposer'], proposal) &&
            this.state.view === 'purpose' && (
              <span>
                Forslaget blev præsenteret for folketinget af {R.path(['presentation', 'proposer'], proposal)}
              </span>
            )}
          {this.state.view === 'resume' ? (
            resume.map(function(paragraph, index) {
              if (!paragraph && !index) {
                return (
                  <div>
                    <p key={index}>Der findes desværre ikke et resumé for dette forslag endnu.</p>
                    <p>
                      Selvom der ikke er blevet skrevet et resumé, kan du stadig læse selve forslaget i PDF-form ved at
                      klikke på 'Læs forslag'-knappen.
                    </p>
                  </div>
                );
              } else {
                return <p key={index}>{paragraph}</p>;
              }
            })
          ) : proposal.presentation ? (
            proposal.presentation.paragraphs.map(function(paragraph, index) {
              return <p key={index}>{paragraph}</p>;
            })
          ) : (
            <div>
              <p>Der findes desværre ikke en fremlæggelse af baggrunden for dette forslag endnu.</p>
              <p>
                Selvom der ikke er blevet skrevet en baggrund for forslaget, kan du stadig læse selve forslaget i
                PDF-form ved at klikke på 'Læs forslag'-knappen.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProposalInfo;
