import React, { Component } from 'react';
import Modal from '../modal';
import LoadingSpinner from '../loadingSpinner';
import R from 'ramda';
import { Link } from 'react-router-dom';
import FormInput from '../formInput';
import FormSelect from '../formSelect';
import FormTextArea from '../formTextArea';

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
      category: (project && project.category.id) || '',
      bio: (project && project.initiator.bio) || '',
      description: (project && project.description) || '',
      budget: (project && project.budget) || '',
      argument: (project && project.argument) || '',
      risk: (project && project.risk) || '',
      published: (project && project.published) || ''
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
    if (this.state.published) {
      this.setState({ showModal: 'confirm' });
    } else {
      this.handleSubmit(true);
    }
  }

  async handleSubmit(published) {
    this.setState({ showModal: 'loading' });
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
      const modal = !published ? 'draft' : !this.state.published ? 'published' : 'public';
      this.setState({ showModal: modal });
    } else {
      this.props.updateState({ entityType: 'error', entity: response.status });
      this.setState({ showModal: false });
    }
  }

  render() {
    const project = this.state;
    const preferenceList = this.props.preferenceList;
    if (project) {
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
          {project.showModal === 'loading' && <Modal content={<LoadingSpinner />} />}
          {project.showModal === 'draft' && (
            <Modal
              content={
                <div>
                  <h2>Projektet blev gemt</h2>
                  <p>Dit projekt er gemt som kladde, så det kun er synligt for dig.</p>
                  <p>
                    Du kan altid gå tilbage og rette i projektet, også efter det publiceret. Vi holder styr på tidligere
                    versioner for dig.
                  </p>
                  <Link to={`../../project/${project.id}`} className="btn btn-primary mt-8 mb-4">
                    OK
                  </Link>
                </div>
              }
            />
          )}
          {project.showModal === 'published' && (
            <Modal
              content={
                <div>
                  <h2>Succes! Projektet blev publiceret</h2>
                  <p>
                    Dit projekt er nu offentligt og du skal samle opbakning til dit forslag. Det gør du ved at række ud
                    til folk i dit netværk og sende dem til din projektside. Det gør det med linket her:
                  </p>
                  <p>{window.location.origin + '/project/' + project.id}</p>
                  <p>
                    Når projektet har samlet støtte fra 15 andre brugere kommer det på projektlisten her på platformen.
                  </p>
                  <Link to={`../../project/${project.id}`} className="btn btn-primary mt-8 mb-4">
                    OK
                  </Link>
                </div>
              }
            />
          )}
          {project.showModal === 'public' && (
            <Modal
              content={
                <div>
                  <h2>Projektet blev publiceret</h2>
                  <p>
                    Du kan altid gå tilbage og rette i projektet, som du bliver klogere undervejs. Vi holder styr på
                    tidligere versioner for dig.
                  </p>
                  <p>Husk du altid kan dele dit projekt direkte med linket:</p>
                  <p>{window.location.origin + '/project/' + project.id}</p>
                  <Link to={`../../project/${project.id}`} className="btn btn-primary mt-8 mb-4">
                    OK
                  </Link>
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
                <span className="block font-bold mb-2">{this.props.title}</span>
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
              <FormTextArea
                title="Bio"
                name="bio"
                value={project.bio}
                placeholder="Fortæl din baggrund for at være initiativtager til dette forslag..."
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
                <button onClick={this.handlePublish} className="btn btn-secondary m-2">
                  Gem som kladde
                </button>
              ) : (
                <button className="btn btn-disabled m-2" disabled>
                  Gem som kladde
                </button>
              )}
              {project.isPublishable ? (
                <button onClick={() => this.handleSubmit(true)} className="btn btn-primary m-2">
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
    }
  }
}

export default ProjectForm;
