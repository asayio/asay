import React, { Component } from 'react';
import R from 'ramda';

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
      risk: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        risk: project.risk
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/project/', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
    if (response.ok) {
      const projectid = await response.json();
      const project = Object.assign({}, this.state, projectid);
      this.props.updateState({ entityType: 'projectList', entity: project });
    } else {
      this.props.updateState({ entityType: 'error', entity: response.status });
    }
  }

  render() {
    const project = this.state;
    const preferenceList = this.props.preferenceList;
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
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
        <input type="submit" value="Gem projekt" />
      </form>
    );
  }
}

export default ProjectForm;
