import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import R from 'ramda';
import FeatherIcon from '../../components/featherIcon';
import ProposalList from '../../components/proposalList';
import FormSelect from '../../components/formSelect';
import NotificationBox from '../../components/notificationBox';

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      category: 'Alle',
      sort: 'supportDesc'
    };
    this.updateState = this.updateState.bind(this);
    this.closeNotificationBox = this.closeNotificationBox.bind(this);
  }

  closeNotificationBox() {
    this.props.updateState({
      entityType: 'user',
      entity: Object.assign({}, this.props.user, { onboardedprojects: true })
    });
    fetch('/api/user/onboarding/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
  }

  updateState(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  render() {
    const user = this.props.user;
    const showNotificationBox = user && !user.onboardedprojects;

    const sortOrder = this.state.sort === 'supportDesc' || this.state.sort === 'createdonDesc' ? 'desc' : 'asc';
    const sortBy = this.state.sort === 'supportDesc' || this.state.sort === 'supportAsc' ? 'support' : 'createdon';
    const sortProjectList = R.sortWith([sortOrder === 'desc' ? R.descend(R.prop(sortBy)) : R.ascend(R.prop(sortBy))]);
    let projectList = this.props.projectList;
    projectList = sortProjectList(projectList);
    projectList = R.filter(project => {
      return project.support >= 15; // show only project with support from 15 or more people
    }, projectList);
    if (this.state.category !== 'Alle') {
      projectList = R.filter(project => {
        return project.category.title === this.state.category;
      }, projectList);
    }
    const preferenceList = this.props.preferenceList;
    const sortList = [
      { value: 'supportDesc', title: 'Flest støtter' },
      { value: 'supportAsc', title: 'Færrest støtter' },
      { value: 'createdonDesc', title: 'Nyeste' },
      { value: 'createdonAsc', title: 'Ældste' }
    ];
    return (
      <div className="flex-auto px-2">
        {showNotificationBox && (
          <NotificationBox
            title="Projekter fra folk med noget på hjerte"
            closeNotificationBox={this.closeNotificationBox}>
            <p className="mb-1">blabla</p>
          </NotificationBox>
        )}
        <div className="max-w-xl mx-auto">
          <h1>Projekter</h1>
          <div className="flex flex-wrap md:flex-no-wrap -mx-1 -mt-2 mb-4">
            <div className="w-1/2 px-1">
              <label className="block text-center my-2">Kategori:</label>
              <FormSelect
                name="category"
                value={this.state.category}
                onChange={this.updateState}
                defaultOption="Alle"
                options={preferenceList.map(item => <option key={item.id}>{item.title}</option>)}
              />
            </div>
            <div className="w-1/2 px-1">
              <label className="block text-center my-2">Sorter efter:</label>
              <FormSelect
                name="sort"
                value={this.state.sortBy}
                onChange={this.updateState}
                options={sortList.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.title}
                  </option>
                ))}
              />
            </div>
            {this.props.user ? (
              <div className="w-full md:w-1/2 flex items-end py-2 md:py-0">
                <Link to="/projects/mine" className="w-full btn btn-white mx-1">
                  <FeatherIcon name="User" className="mr-2" />Mine projekter
                </Link>
                <div className="hidden md:block mx-1">
                  <Link to="/projects/new" className="w-full btn btn-white">
                    <FeatherIcon name="PlusCircle" className="mr-2" />Opret projekt
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex w-1/4 items-end px-1 py-2 md:py-0">
                <button
                  onClick={() => this.props.updateState({ entityType: 'error', entity: 401 })}
                  className="w-full btn btn-white">
                  <FeatherIcon name="PlusCircle" className="mr-2" />Opret projekt
                </button>
              </div>
            )}
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
