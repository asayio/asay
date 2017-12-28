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
        <div>
          <div>
            <a
              onClick={() => this.setState({ view: 'resume' })}
              className={(this.state.view === 'resume' ? '' : '') + ''}>
              <FileText />Resume
            </a>
          </div>
          <div>
            <a
              onClick={() => this.setState({ view: 'purpose' })}
              className={(this.state.view === 'purpose' ? '' : '') + ''}>
              <FileText />Formål
            </a>
          </div>
        </div>
        <div>
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
