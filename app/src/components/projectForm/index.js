import React, { Component } from 'react';
import R from 'ramda';

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      category: 'non-selected',
      bio: '',
      description: '',
      budget: '',
      argument: '',
      risk: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.projectList) {
      const project = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.projectList);
      this.setState({
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

  render() {
    const project = this.state;
    console.log(project);
    const preferenceList = this.props.preferenceList;
    return (
      <form onChange={this.handleChange}>
        <label>
          Titel
          <input
            type="text"
            name="title"
            value={project.title}
            placeholder="Giv dit projekt en informativ og fængende titel..."
          />
        </label>
        <div>
          <label>
            Kategori
            <select name="category" value={project.category} onChange={this.handleChange}>
              <option value="non-selected" disabled>
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
            />
          </label>
        </div>
        <label>
          Beskrivelse
          <input
            type="text"
            name="description"
            value={project.description}
            placeholder="Beskriv dit projekt kort men fyldestgørende..."
          />
        </label>
        <label>
          Budgettering
          <input
            type="text"
            name="budget"
            value={project.budget}
            placeholder="Gør rede for forslagets økonomisk omfang samt hvordan det finansieres..."
          />
        </label>
        <label>
          Begrundelse og argumentation
          <input
            type="text"
            name="argument"
            value={project.argument}
            placeholder="Fremlæg argumentation og begrundelse for, hvorfor forslaget er en god idé..."
          />
        </label>
        <label>
          Risiko og udfordringer
          <input
            type="text"
            name="risk"
            value={project.title}
            placeholder="Præsenter de identificerede risici, der kan udfordre forslagets mulighed for succes..."
          />
        </label>
      </form>
    );
  }
}

export default ProjectForm;
