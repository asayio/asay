import React, { Component } from 'react';
import R from 'ramda';
import LoadingSpinner from '../loadingSpinner';
// import UploadImage from '../uploadImage';
import getImageBinary from '../uploadImage/getImageBinary';
import FormInput from '../formInput';
import FormSelect from '../formSelect';
import FormTextArea from '../formTextArea';
import ActiveModal from './activeModal';
import SavedModal from './savedModal';

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
    const emptyCommitments = [
      { priority: 1, category: 'Vælg kategori', commitment: '' },
      { priority: 2, category: 'Vælg kategori', commitment: '' },
      { priority: 3, category: 'Vælg kategori', commitment: '' }
    ];
    const knownCommitments =
      candidate.commitments &&
      candidate.commitments.map(commitment => {
        const flatCommitment = Object.assign({}, commitment, {
          category: commitment.category.id
        });
        return flatCommitment;
      });
    const commitments = R.unionWith(R.eqBy(R.prop('priority')), knownCommitments, emptyCommitments);
    const obj = Object.assign({}, candidate, {
      id: Number(this.props.match.params.id),
      commitments: commitments,
      constituency: (candidate.constituency && candidate.constituency.id) || 'Vælg opstillingskreds'
    });
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
      form.experience !== '' &&
      form.commitments[0].commitment !== '' &&
      form.commitments[1].commitment !== '' &&
      form.commitments[2].commitment !== '' &&
      form.commitments[0].category !== 'Vælg kategori' &&
      form.commitments[1].category !== 'Vælg kategori' &&
      form.commitments[2].category !== 'Vælg kategori' &&
      form.terms
    ) {
      this.setState({ isPublishable: true });
    } else {
      this.setState({ isPublishable: false });
    }
  }

  async handleChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    switch (target.type) {
      case 'checkbox':
        value = target.checked;
        break;
      case 'file':
        value = getImageBinary(document.getElementById('image-to-upload'));
        break;
      default:
        value = target.value;
    }
    await this.setState({
      [target.name]: value
    });
    this.handlePreperationEvaluation();
  }

  handleCommitmentChange(priority, type) {
    return function(event) {
      const value = type === 'commitment' ? event.target.value : Number(event.target.value);
      const existingCommitment = R.find(R.propEq('priority', priority))(this.state.commitments);
      const updatedCommitment = Object.assign({}, existingCommitment, R.objOf(type, value));
      const newCommitmentList = R.filter(c => c.priority !== priority, this.state.commitments).concat(
        updatedCommitment
      );
      this.setState(
        Object.assign({}, this.state, { commitments: newCommitmentList }),
        this.handlePreperationEvaluation()
      );
    }.bind(this);
  }

  async handleSubmit(active) {
    this.props.updateState({ entityType: 'modal', entity: 'loading' });
    const candidate = Object.assign({}, this.state, {
      constituency: Number(this.state.constituency),
      active: active
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
      const modal = active ? (
        <ActiveModal candidateId={candidate.id} updateState={this.props.updateState} />
      ) : (
        <SavedModal candidateId={candidate.id} updateState={this.props.updateState} />
      );
      this.props.upadateState({ entityType: 'modal', entity: { content: modal } });
    } else {
      this.props.updateState({ entityType: 'modal', entity: response.status });
    }
  }

  render() {
    const candidate = this.state;
    const commitments = candidate.commitments && R.sortWith([R.ascend(R.prop('priority'))])(candidate.commitments);
    const constituencyList = this.props.constituencyList;
    if (candidate.id) {
      return (
        <div>
          <form onChange={this.handleChange} onSubmit={e => e.preventDefault()}>
            <div className="bg-white border border-grey-lighter rounded-sm shadow px-8 py-4 my-4">
              <div className="max-w-md mx-auto">
                <h2>Social tilstedeværelse</h2>
                <p>
                  Hjælp dine støttere med at lære dig bedre at kende, samt følge og komme i kontakt med dig. Der er op
                  til dig hvad du vil dele, men vi anbefaler at udfylde så meget som muligt.{' '}
                  <b>Bemærk, at andre brugere kan se din email.</b>
                </p>
                {/* <UploadImage
                  name="image"
                /> */}
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
                {/* <FormInput
                  title="Youtube URL"
                  name="youtube"
                  value={candidate.youtube}
                  placeholder="Link til videopræsentation af dit kandidatur"
                  type="url"
                /> */}
              </div>
            </div>
            <div className="bg-white border border-grey-lighter rounded-sm shadow px-8 py-4 my-4">
              <div className="max-w-md mx-auto">
                <h2>Kandidatur</h2>
                <label className="block md:w-1/2 my-8">
                  <span className="block font-bold mb-2">Hvilken storkreds ønsker du at stille op i? *</span>
                  <FormSelect
                    title="Storkreds"
                    name="constituency"
                    value={candidate.constituency}
                    defaultOption="Vælg opstillingskreds"
                    defaultOptionDisabled="yes"
                    options={constituencyList.map(constituency => (
                      <option value={constituency.id} key={constituency.id}>
                        {constituency.constituency}
                      </option>
                    ))}
                  />
                </label>
                <FormTextArea
                  title="Kort om din motivation *"
                  name="motivation"
                  value={candidate.motivation}
                  placeholder="Fortæl hvorfor du ønsker at stille op til Folketinget?"
                />
                <FormTextArea
                  title="Kort om din baggrund *"
                  name="story"
                  value={candidate.story}
                  placeholder="Fortæl din livshistorie. Kort."
                />
                <FormTextArea
                  title="Politisk erfaring *"
                  name="experience"
                  value={candidate.experience}
                  placeholder="Har du tidligere erfaring fra politik, f.eks. opstilling, offentlig fremtoning el. lign.?"
                />
                <FormTextArea
                  title="Dette kan skade mit kandidatur *"
                  name="threat"
                  value={candidate.threat}
                  placeholder="Vi har behov for transparens. Det er derfor vigtigt, at du åbent fortæller os og vælgerne de ting, som medierne kunne finde på at grave i, hvis du stiller op til Folketinget."
                />
              </div>
            </div>
            <div className="bg-white border border-grey-lighter rounded-sm shadow px-8 py-4 my-4">
              <div className="max-w-md mx-auto">
                <h2>Fokusområder</h2>
                <p>
                  Vælg tre politiske emner du vil engagere dig i og forklar. Begrund dine valg og redegør kort for din
                  indgangsvinkel.
                </p>
                {commitments.map(commitment => (
                  <div key={commitment.priority}>
                    <label className="block md:w-1/2 mt-8">
                      <span className="block font-bold mb-2">Kategori *</span>
                      <FormSelect
                        onChange={this.handleCommitmentChange(commitment.priority, 'category')}
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
                    </label>
                    <FormTextArea
                      onChange={this.handleCommitmentChange(commitment.priority, 'commitment')}
                      name="commitment"
                      value={commitment.commitment}
                      placeholder="Her skal stå noget"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-grey-lighter rounded-sm shadow px-8 pt-4 pb-8 my-4">
              <div className="max-w-md mx-auto">
                <h2>Godkend og offentliggør dit kandidatur</h2>
                <div className="flex">
                  <div className="pr-2">
                    <input name="terms" onChange={this.handleChange} checked={candidate.terms} type="checkbox" />
                  </div>
                  <p>
                    Jeg bekræfter hermed, at jeg tiltræder{' '}
                    <a
                      href="https://assets.initiativet.dk/files/initiativet_forretningsorden.pdf"
                      target="_forretningsorden"
                      className="inline-link">
                      Initiativets Forretningsorden for Folketingsgruppen
                    </a>{' '}
                    og ønsker at offentliggøre mit kandidatur.
                  </p>
                </div>
                <div className="-mx-2">
                  {candidate.active ? (
                    <button className="btn btn-disabled m-2">Gem som kladde</button>
                  ) : (
                    <button onClick={() => this.handleSubmit(false)} className="btn btn-secondary m-2">
                      Gem som kladde
                    </button>
                  )}
                  {candidate.isPublishable ? (
                    <button onClick={() => this.handleSubmit(true)} className="btn btn-primary m-2">
                      Offentliggør
                    </button>
                  ) : (
                    <button className="btn btn-disabled m-2">Offentliggør</button>
                  )}
                </div>
                {!candidate.isPublishable &&
                  (candidate.active ? (
                    <p>
                      Din kandidatprofil er offentlig og det skulle helst forblive sådan. Sørg for, at din
                      kandidatprofil er udfyldt og fuldstændig.
                    </p>
                  ) : (
                    <p>
                      Du har ikke udfyldt alle obligatoriske oplysninger. Vi kan ikke offentliggøre dit kandidatur, før
                      din kandidatprofil er fuldstændig.
                    </p>
                  ))}
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default candidateForm;
