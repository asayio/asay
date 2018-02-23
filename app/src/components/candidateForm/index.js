import React, { Component } from 'react';
import Modal from '../modal';
import LoadingSpinner from '../loadingSpinner';
import { Link } from 'react-router-dom';
import FormInput from '../formInput';
import FormSelect from '../formSelect';
import FormTextArea from '../formTextArea';

class candidateForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleCommitmentChange = this.handleCommitmentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreperationEvaluation = this.handlePreperationEvaluation.bind(this);
  }

  componentDidMount() {
    const candidate = this.props.candidate;
    const commitments =
      candidate.commitments &&
      candidate.commitments.map(commitment => {
        const flatCommitment = Object.assign({}, commitment, {
          category: commitment.category.id
        });
        return flatCommitment;
      });
    const obj = Object.assign({}, candidate, {
      id: Number(this.props.match.params.id),
      commitments: commitments,
      constituency: candidate.constituency.id
    });
    console.log(obj);
    this.setState(obj);
    this.handlePreperationEvaluation(obj);
  }

  handlePreperationEvaluation(obj) {
    const form = obj ? obj : this.state;
    if (
      form.constituency !== null &&
      form.story !== '' &&
      form.motivation !== '' &&
      form.threat !== '' &&
      form.experience !== ''
    ) {
      this.setState({ isPublishable: true });
    } else {
      this.setState({ isPublishable: false, active: false });
    }
  }

  async handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
    this.handlePreperationEvaluation();
  }

  async handleCommitmentChange(event, priority) {
    const target = event.target;
  }

  async handleSubmit() {
    this.setState({ showModal: 'loading' });
    const candidate = Object.assign({}, this.state, {
      constituency: Number(this.state.constituency)
    });
    const response = await fetch(`/api/candidate`, {
      method: 'POST',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
    if (response.ok) {
      this.props.updateState({ entityType: 'candidateList', entity: candidate });
      const modal = this.state.active ? 'active' : 'saved';
      this.setState({ showModal: modal });
    } else {
      this.props.updateState({ entityType: 'error', entity: response.status });
      this.setState({ showModal: false });
    }
  }

  render() {
    const candidate = this.state;
    console.log(candidate);
    const constituencyList = this.props.constituencyList;
    if (candidate.id) {
      return (
        <div>
          {candidate.showModal === 'loading' && <Modal content={<LoadingSpinner />} />}
          {candidate.showModal === 'saved' && (
            <Modal
              content={
                <div>
                  <h2>Din kandidatprofil blev gemt</h2>
                  <p>Din kandidatprofil er ikke offentlig, men kun synlig for dig.</p>
                  <p>Du kan altid gå tilbage og rette i projektet, også efter dit kandidatur er offentligt.</p>
                  <Link to={`../../candidate/${candidate.id}`} className="btn btn-primary mt-8 mb-4">
                    OK
                  </Link>
                </div>
              }
            />
          )}
          {candidate.showModal === 'active' && (
            <Modal
              content={
                <div>
                  <h2>Tillykke! Dit kandidatur er offentligt</h2>
                  <p>Dit kandidatur fremgår på listen over kandidater.</p>
                  <p>
                    Du skal nu række ud til folk i dit netværk og sende dem til din kandidatprofil og for at samle
                    støtte til din opstilling. Det gør du med linket her:
                  </p>
                  <p>{window.location.origin + '/candidate/' + candidate.id}</p>
                  <p />
                  <Link to={`../../candidate/${candidate.id}`} className="btn btn-primary mt-8 mb-4">
                    OK
                  </Link>
                </div>
              }
            />
          )}
          <div className="max-w-md mx-auto">
            <form onChange={this.handleChange} onSubmit={e => e.preventDefault()} className="-mt-8">
              <div>
                <h2>Social tilstedeværelse</h2>
                <FormInput title="Telefon" name="phone" value={candidate.phone} placeholder="Telefon nr." type="text" />
                <FormInput
                  title="Facebook URL"
                  name="facebook"
                  value={candidate.facebook}
                  placeholder="Link til din Facebook profil"
                  type="url"
                />
                <FormInput
                  title="Twitter URL"
                  name="twitter"
                  value={candidate.twitter}
                  placeholder="Link til din Twitter profil"
                  type="url"
                />
                <FormInput
                  title="LinkedIn URL"
                  name="linkedin"
                  value={candidate.linkedin}
                  placeholder="Link til din LinkedIn profil"
                  type="url"
                />
                <FormInput
                  title="Youtube URL"
                  name="youtube"
                  value={candidate.youtube}
                  placeholder="Link til videopræsentation af dit kandidatur"
                  type="url"
                />
              </div>
              <div>
                <h2>Kandidatur</h2>
                <label className="block md:w-1/2 my-8">
                  <span className="block font-bold mb-2">Hvilken storkreds ønsker du at stille op i?</span>
                  <FormSelect
                    title="Storkreds"
                    name="constituency"
                    value={candidate.constituency}
                    defaultOption="Vælg kategori"
                    defaultOptionDisabled="yes"
                    options={constituencyList.map(constituency => (
                      <option value={constituency.id} key={constituency.id}>
                        {constituency.constituency}
                      </option>
                    ))}
                  />
                </label>
                <FormTextArea
                  title="Kort om din baggrund"
                  name="story"
                  value={candidate.story}
                  placeholder="Fortæl din livshistorie. Kort."
                />
                <FormTextArea
                  title="Kort om din motivation"
                  name="motivation"
                  value={candidate.motivation}
                  placeholder="Fortæl hvorfor du ønsker at stille op til Folketinget?"
                />
                <FormTextArea
                  title="Politisk erfaring"
                  name="experience"
                  value={candidate.experience}
                  placeholder="Har du tidligere erfaring fra politik, f.eks. opstilling, offentlig fremtoning el. lign.?"
                />
                <FormTextArea
                  title="Dette kan skade mit kandidatur"
                  name="threat"
                  value={candidate.threat}
                  placeholder="Vi har behov for transparens. Det er derfor vigtigt, at du åbent fortæller os og vælgerne de ting, som medierne kunne finde på at grave i, hvis du stiller op til Folketinget."
                />
              </div>
              <div>
                <h2>Fokusområder</h2>
                <p>
                  Vælg tre politiske emner du vil engagere dig i og forklar. Begrund dine valg og redegør kort for din
                  indgangsvinkel.
                </p>
                {candidate.commitments.map(commitment => (
                  <div key={commitment.priority}>
                    <FormSelect
                      onChange={this.handleCommitmentChange}
                      name="category"
                      value={commitment.category}
                      defaultOption="Vælg kategori"
                      defaultOptionDisabled="yes"
                      options={this.props.preferenceList.map(category => (
                        <option value={category.id} key={category.id}>
                          {category.title}
                        </option>
                      ))}
                    />
                    <FormTextArea
                      onChange={this.handleCommitmentChange}
                      name="commitment"
                      value={commitment.commitment}
                      placeholder="Her skal stå noget"
                    />
                  </div>
                ))}
              </div>
              <div>
                <h2>Godkend og offentliggør dit kandidatur</h2>
                {candidate.isPublishable ? (
                  <div>
                    <input name="active" onChange={this.handleChange} checked={candidate.active} type="checkbox" />
                    <p>
                      Jeg bekræfter hermed, at jeg tiltræder{' '}
                      <a
                        href="https://assets.initiativet.dk/files/initiativet_forretningsorden.pdf"
                        target="_forretningsorden">
                        Initiativets Forretningsorden for Folketingsgruppen
                      </a>{' '}
                      og ønsker at offentliggøre mit kandidatur.
                    </p>
                  </div>
                ) : (
                  <p>
                    Du har ikke udfyldt alle obligatoriske oplysninger. Vi kan ikke offentliggøre dit kandidatur, før
                    din kandidatprofil er fuldstændig.
                  </p>
                )}
              </div>
            </form>
            <div className="text-center -my-2">
              {!candidate.active &&
                candidate.originalActive && (
                  <button onClick={this.handleSubmit} className="btn btn-secondary m-2">
                    Træk kandidatur tilbage
                  </button>
                )}
              {!candidate.active &&
                !candidate.originalActive && (
                  <button onClick={this.handleSubmit} className="btn btn-secondary m-2">
                    Gem som kladde
                  </button>
                )}
              {candidate.active && (
                <button onClick={this.handleSubmit} className="btn btn-primary m-2">
                  Offentliggør
                </button>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default candidateForm;
