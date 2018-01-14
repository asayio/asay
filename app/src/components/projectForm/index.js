import React, { Component } from 'react';
import Modal from '../modal';
import LoadingSpinner from '../loadingSpinner';
import R from 'ramda';
import { Link } from 'react-router-dom';

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      category: '',
      bio: '',
      description: '',
      budget: '',
      argument: '',
      risk: '',
      published: false,
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  componentDidMount() {
    if (this.props.projectList) {
      const project = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.projectList);
      this.setState({
        id: project.id,
        title: project.title,
        category: project.category.id,
        bio: project.initiator.bio,
        description: project.description,
        budget: project.budget,
        argument: project.argument,
        risk: project.risk,
        published: project.published,
        showModal: false
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
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
    const response = await fetch('/api/project/', {
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
      this.props.updateState({ entityType: 'projectList', entity: project });
      const modal = !published ? 'draft' : !this.state.published ? 'published' : 'public';
      this.setState({ showModal: modal });
    } else {
      this.props.updateState({ entityType: 'error', entity: response.status });
    }
  }

  render() {
    const project = this.state;
    const preferenceList = this.props.preferenceList;
    return (
      <div>
        {project.showModal === 'confirm' && (
          <Modal
            content={
              <div>
                <h1>Er du sikker?</h1>
                <p>Du er ved et publicere dit projekt.</p>
                <p>
                  Sammen med projektet publiceres også dit navn og email, så andre kan komme i kontakt med dig og
                  bidrage til forslaget.
                </p>
                <button onClick={() => this.handleSubmit(false)}>Gem som kladde</button>
                <button onClick={() => this.handleSubmit(true)}>Publicer</button>
              </div>
            }
          />
        )}
        {project.showModal === 'loading' && <Modal content={<LoadingSpinner />} />}
        {project.showModal === 'draft' && (
          <Modal
            content={
              <div>
                <h1>Projektet blev gemt</h1>
                <p>Dit projekt er gemt som kladde, så det kun er synligt for dig.</p>
                <p>
                  Du kan altid gå tilbage og rette i projektet, også efter det publiceret. Vi holder styr på tidligere
                  versioner for dig.
                </p>
                <Link to={`../../project/${project.id}`}>OK</Link>
              </div>
            }
          />
        )}
        {project.showModal === 'published' && (
          <Modal
            content={
              <div>
                <h1>Succes! Projektet blev publiceret</h1>
                <p>
                  Dit projekt er nu offentligt og du skal samle opbakning til dit forslag. Det gør du ved at række ud
                  til folk i dit netværk og sende dem til din projektside. Det gør det med linket her:
                </p>
                <p>{window.location.origin + '/project/' + project.id}</p>
                <p>
                  Når projektet har samlet støtte fra 15 andre brugere kommer det på projektlisten her på platformen.
                </p>
                <Link to={`../../project/${project.id}`}>OK</Link>
              </div>
            }
          />
        )}
        {project.showModal === 'public' && (
          <Modal
            content={
              <div>
                <h1>Projektet blev publiceret</h1>
                <p>
                  Du kan altid gå tilbage og rette i projektet, som du bliver klogere undervejs. Vi holder styr på
                  tidligere versioner for dig.
                </p>
                <p>Husk du altid kan dele dit projekt direkte med linket:</p>
                <p>{window.location.origin + '/project/' + project.id}</p>
                <Link to={`../../project/${project.id}`}>OK</Link>
              </div>
            }
          />
        )}
        <form onChange={this.handleChange} onSubmit={e => e.preventDefault()}>
          <label>
            Titel
            <input
              type="text"
              name="title"
              value={project.title}
              placeholder="Giv dit projekt en informativ og fængende titel..."
              required
            />
          </label>
          <label>
            Kategori
            <select name="category" value={project.category} onChange={this.handleChange} required>
              <option value="" disabled>
                Vælg kategori
              </option>
              {preferenceList.map(item => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Bio
            <input
              type="text"
              name="bio"
              value={project.bio}
              placeholder="Fortæl din baggrund for at være initiativtager til dette forslag..."
              required
            />
          </label>
          <label>
            Beskrivelse
            <input
              type="text"
              name="description"
              value={project.description}
              placeholder="Beskriv dit projekt kort men fyldestgørende..."
              required
            />
          </label>
          <label>
            Budgettering
            <input
              type="text"
              name="budget"
              value={project.budget}
              placeholder="Gør rede for forslagets økonomisk omfang samt hvordan det finansieres..."
              required
            />
          </label>
          <label>
            Begrundelse og argumentation
            <input
              type="text"
              name="argument"
              value={project.argument}
              placeholder="Fremlæg argumentation og begrundelse for, hvorfor forslaget er en god idé..."
              required
            />
          </label>
          <label>
            Risiko og udfordringer
            <input
              type="text"
              name="risk"
              value={project.risk}
              placeholder="Præsenter de identificerede risici, der kan udfordre forslagets mulighed for succes..."
              required
            />
          </label>
        </form>
        {!project.published && <button onClick={this.handlePublish}>Gem som kladde</button>}
        <button onClick={() => this.handleSubmit(true)}>Publicer</button>
      </div>
    );
  }
}

export default ProjectForm;
