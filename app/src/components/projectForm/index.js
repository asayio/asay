import React, { Component } from 'react';
import Modal from '../modal';
import R from 'ramda';
import { Link } from 'react-router-dom';
import FormInput from '../formInput';
import FormSelect from '../formSelect';
import FormTextArea from '../formTextArea';
import DraftModal from './draftModal';
import PublicModal from './publicModal';
import PublishedModal from './publishedModal';

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handlePreperationEvaluation = this.handlePreperationEvaluation.bind(this);
  }

  componentDidMount() {
    const project =
      this.props.projectList && R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.projectList);
    const obj = {
      id: (project && project.id) || null,
      title: (project && project.title) || '',
      category: (project && project.category.id) || 'Vælg kategori',
      bio: (project && project.initiator.bio) || '',
      description: (project && project.description) || '',
      budget: (project && project.budget) || '',
      argument: (project && project.argument) || '',
      risk: (project && project.risk) || '',
      published: (project && project.published) || false
    };
    this.setState(obj);
    this.handlePreperationEvaluation(obj);
  }

  handlePreperationEvaluation(obj) {
    const form = obj ? obj : this.state;
    if (form.title !== '' && form.category !== '') {
      this.setState({ isSaveable: true });
      if (
        form.bio !== '' &&
        form.description !== '' &&
        form.budget !== '' &&
        form.argument !== '' &&
        form.risk !== ''
      ) {
        this.setState({ isPublishable: true });
      } else {
        this.setState({ isPublishable: false });
      }
    } else {
      this.setState({ isSaveable: false });
    }
  }

  async handleChange(event) {
    const target = event.target;
    await this.setState({ [target.name]: target.value });
    this.handlePreperationEvaluation();
  }

  handlePublish() {
    if (!this.state.published) {
      this.setState({ showModal: 'confirm' });
    } else {
      this.handleSubmit(true);
    }
  }

  async handleSubmit(published) {
    this.props.updateState({ entityType: 'modal', entity: 'loading' });
    const body = Object.assign({}, this.state, { published: published });
    const response = await fetch(`/api/project/${this.state.id}/edit`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
    if (response.ok) {
      const projectid = await response.json();
      const project = Object.assign({}, this.state, {
        id: projectid.id,
        published: published,
        category: Number(this.state.category)
      });
      this.setState({ id: projectid.id });
      this.props.updateState({ entityType: 'projectList', entity: project });
      const modal = !published ? (
        <DraftModal projectId={project.id} />
      ) : !this.state.published ? (
        <PublishedModal projectId={project.id} />
      ) : (
        <PublicModal projectId={project.id} />
      );
      this.props.updateState({ entityType: 'modal', entity: { content: modal } });
    } else {
      this.props.updateState({ entityType: 'error', entity: response.status });
    }
  }

  render() {
    const project = this.state;
    const preferenceList = this.props.preferenceList;
    if (!R.isEmpty(project)) {
      return (
        <div>
          {project.showModal === 'confirm' && (
            <Modal
              content={
                <div>
                  <h2>Er du sikker?</h2>
                  <p>Du er ved et publicere dit projekt.</p>
                  <p>
                    Sammen med projektet publiceres også dit navn og email, så andre kan komme i kontakt med dig og
                    bidrage til forslaget.
                  </p>
                  <div className="mt-6 mb-2">
                    <button onClick={() => this.handleSubmit(false)} className="btn btn-secondary m-2">
                      Gem som kladde
                    </button>
                    <button onClick={() => this.handleSubmit(true)} className="btn btn-primary m-2">
                      Publicer
                    </button>
                  </div>
                </div>
              }
            />
          )}
          <div className="max-w-md mx-auto">
            <form onChange={this.handleChange} onSubmit={e => e.preventDefault()} className="-mt-8">
              <FormInput
                title="Titel"
                name="title"
                value={project.title}
                placeholder="Giv dit projekt en informativ og fængende titel..."
                type="text"
              />
              <label className="block md:w-1/2 my-8">
                <span className="block font-bold mb-2">Kategori</span>
                <FormSelect
                  title="Kategori"
                  name="category"
                  value={project.category}
                  onChange={this.handleChange}
                  defaultOption="Vælg kategori"
                  defaultOptionDisabled="yes"
                  options={preferenceList.map(item => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
                />
              </label>
              <FormInput
                title="Bio"
                name="bio"
                value={project.bio}
                placeholder="Fortæl din baggrund for at være initiativtager til dette forslag..."
                text="text"
              />
              <FormTextArea
                title="Beskrivelse"
                name="description"
                value={project.description}
                placeholder="Beskriv dit projekt kort men fyldestgørende..."
              />
              <FormTextArea
                title="Budgettering"
                name="budget"
                value={project.budget}
                placeholder="Gør rede for forslagets økonomisk omfang samt hvordan det skal finansieres..."
              />
              <FormTextArea
                title="Begrundelse og argumentation"
                name="argument"
                value={project.argument}
                placeholder="Fremlæg argumentation og begrundelse for, hvorfor forslaget er en god idé..."
              />
              <FormTextArea
                title="Risici og udfordringer"
                name="risk"
                value={project.risk}
                placeholder="Præsenter de identificerede risici, der kan udfordre forslagets mulighed for succes..."
              />
            </form>
            <div className="text-center -my-2">
              {!project.published && project.isSaveable ? (
                <button onClick={() => this.handleSubmit(false)} className="btn btn-secondary m-2">
                  Gem som kladde
                </button>
              ) : (
                <button className="btn btn-disabled m-2" disabled>
                  Gem som kladde
                </button>
              )}
              {project.isPublishable ? (
                <button onClick={() => this.handlePublish()} className="btn btn-primary m-2">
                  Publicer
                </button>
              ) : (
                <button className="btn btn-disabled m-2" disabled>
                  Publicer
                </button>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>{'Henter projekt...'}</div>;
    }
  }
}

export default ProjectForm;
