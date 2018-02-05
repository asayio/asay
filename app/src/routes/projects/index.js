import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import R from 'ramda';
import FeatherIcon from '../../components/featherIcon';
import ProposalList from '../../components/proposalList';
import FormSelect from '../../components/formSelect';

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
      return project.support > 0; // show only project with support from 15 or more people
    }, projectList);
    if (this.state.category !== 'Alle') {
      projectList = R.filter(project => {
        return project.category.title === this.state.category;
      }, projectList);
    }
    const preferenceList = this.props.preferenceList;
    const sortList = [{ value: 'support', title: 'Antal støtter' }, { value: 'createdon', title: 'Oprettelsesdato' }];
    const supportedOrder = [
      { value: 'desc', title: 'Mest støttede først' },
      { value: 'asc', title: 'Mindst støttede først' }
    ];
    const chronologicalOrder = [{ value: 'desc', title: 'Nyeste først' }, { value: 'asc', title: 'Ældste først' }];
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <h1>Projekter</h1>
          <div className="flex flex-wrap md:flex-no-wrap -mx-1 -mt-2 mb-4">
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/2 px-1">
                <label className="block text-center my-2">Kategori:</label>
                <FormSelect
                  name="category"
                  value={this.state.category}
                  onChange={this.updateState}
                  defaultOption="Alle"
                  options={preferenceList.map(item => <option key={item.id}>{item.title}</option>)}
                />
              </div>
              <div className="w-1/2 md:w-1/4 px-1">
                <label className="block text-center my-2">Sorter efter:</label>
                <FormSelect
                  name="sortBy"
                  value={this.state.sortBy}
                  onChange={this.updateState}
                  options={sortList.map(item => <option value={item.value}>{item.title}</option>)}
                />
              </div>
              <div className="w-1/2 md:w-1/4 px-1">
                <label className="block text-center my-2">Rækkefølge:</label>
                <FormSelect
                  name="sortOrder"
                  value={this.state.sortOrder}
                  onChange={this.updateState}
                  options={
                    this.state.sortBy === 'support'
                      ? supportedOrder.map(item => <option value={item.value}>{item.title}</option>)
                      : chronologicalOrder.map(item => <option value={item.value}>{item.title}</option>)
                  }
                />
              </div>
            </div>
            <div className="hidden md:flex flex-col justify-end px-1">
              {this.props.user ? (
                <Link to="/projects/new" className="btn btn-white">
                  <FeatherIcon name="PlusCircle" className="mr-2" />Opret projekt
                </Link>
              ) : (
                <button
                  onClick={() => this.props.updateState({ entityType: 'error', entity: 401 })}
                  className="btn btn-white">
                  <FeatherIcon name="PlusCircle" className="mr-2" />Opret projekt
                </button>
              )}
            </div>
          </div>
          {projectList.length ? (
            <ProposalList proposalList={projectList} />
          ) : (
            <p className="text-center mx-auto my-12">Her ser lidt tomt ud. Prøv at udvide din søgning.</p>
          )}
        </div>
      </div>
    );
  }
}

export default Projects;
