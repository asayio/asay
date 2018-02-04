import React, { Component } from 'react';
import R from 'ramda';
import ProposalList from '../../components/proposalList';
import { Link } from 'react-router-dom';

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      category: 'Alle',
      sortBy: 'support',
      sortOrder: 'desc'
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  render() {
    const sortProjectList = R.sortWith([
      this.state.sortOrder === 'desc' ? R.descend(R.prop(this.state.sortBy)) : R.ascend(R.prop(this.state.sortBy))
    ]);
    let projectList = this.props.projectList;
    projectList = sortProjectList(projectList);
    projectList = R.filter(project => {
      return project.support > 15; // show only project with support from 15 or more people
    }, projectList);
    if (this.state.category !== 'Alle') {
      projectList = R.filter(project => {
        return project.category.title === this.state.category;
      }, projectList);
    }
    const preferenceList = this.props.preferenceList;
    return (
      <div>
        <h1>Alle projekter</h1>
        <div>
          <label>Kategori:</label>
          <select name="category" value={this.state.category} onChange={this.updateState}>
            <option>Alle</option>
            {preferenceList.map(item => <option key={item.id}>{item.title}</option>)}
          </select>
          <label>Sorter efter:</label>
          <select name="sortBy" value={this.state.sortBy} onChange={this.updateState}>
            <option value="support">Antal støtter</option>
            <option value="createdon">Oprettelsesdato</option>
          </select>
          <label>Rækkefølge:</label>
          <select name="sortOrder" value={this.state.sortOrder} onChange={this.updateState}>
            <option value="desc">{this.state.sortBy === 'support' ? 'Mest støttede først' : 'Nyeste først'} </option>
            <option value="asc">{this.state.sortBy === 'support' ? 'Mindst støttede først' : 'Ældste først'}</option>
          </select>
          {this.props.user ? (
            <Link to="/projects/new">Opret projekt</Link>
          ) : (
            <button onClick={() => this.props.updateState({ entityType: 'error', entity: 401 })}>Opret projekt</button>
          )}
        </div>
        {projectList.length ? (
          <ProposalList proposalList={projectList} />
        ) : (
          <p>Her ser lidt tomt ud. Prøv at udvide din søgning.</p>
        )}
      </div>
    );
  }
}

export default Projects;
