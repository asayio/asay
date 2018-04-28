import React, { Component } from 'react';
import R from 'ramda';
import FormSelect from '../../components/formSelect';
import FeatherIcon from '../../components/featherIcon';
import { Link } from 'react-router-dom';
import NotificationBox from '../../components/notificationBox';

class Candidates extends Component {
  constructor() {
    super();
    this.state = {
      category: 'Alle',
      constituency: 'Alle',
      sortOrder: 'Flest støtter'
    };
    this.handleChange = this.handleChange.bind(this);
    this.closeNotificationBox = this.closeNotificationBox.bind(this);
  }

  closeNotificationBox() {
    this.props.updateState({
      entityType: 'user',
      entity: Object.assign({}, this.props.user, { onboardedcandidates: true })
    });
    fetch('/api/user/onboarding/candidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    const user = this.props.user;
    const showNotificationBox = user && !user.onboardedprojects && !this.props.anonymousUser;

    const activeCandidateList = R.filter(candidate => {
      return candidate.active;
    }, this.props.candidateList);

    let candidateList = activeCandidateList;
    if (this.state.constituency !== 'Alle') {
      candidateList = R.filter(candidate => {
        return candidate.constituency.id === Number(this.state.constituency);
      }, candidateList);
    }
    if (this.state.category !== 'Alle') {
      candidateList = R.filter(candidate => {
        const categoryTitleList = candidate.commitments.map(commitment => commitment.category.id);
        return categoryTitleList.includes(Number(this.state.category));
      }, candidateList);
    }
    const sortCandidateList = R.sortWith([
      this.state.sortOrder === 'Flest støtter' ? R.descend(R.prop('support')) : R.ascend(R.prop('support'))
    ]);
    candidateList = sortCandidateList(candidateList);
    const sortOrder = ['Flest støtter', 'Færrest støtter'];
    const userIsCandidate = user && !!R.find(R.propEq('id', user.id), this.props.candidateList);
    return (
      <div className="flex-auto px-2">
        {showNotificationBox && (
          <NotificationBox title="Initiativets kommende kandidater" closeNotificationBox={this.closeNotificationBox}>
            <p>
              Det her er kandidatsiden. Her finder du en liste af borgere, som søger opstilling hos Initiativet. Kig
              listen igennem – og støt den kandidat, du er gladest for.
            </p>
          </NotificationBox>
        )}
        <div className="max-w-xl mx-auto">
          <h1>Kandidater</h1>
          <div className="flex flex-wrap items-end -mx-1 -mt-2 mb-4">
            <form
              onChange={this.handleChange}
              onSubmit={e => e.preventDefault()}
              className="w-full md:w-3/4 flex flex-wrap">
              <div className="w-full md:w-1/3 px-1">
                <label className="block text-center my-2">Interesse:</label>
                <FormSelect
                  name="category"
                  defaultOption="Alle"
                  options={this.props.preferenceList.map(preference => (
                    <option value={preference.id} key={preference.id}>
                      {preference.title}
                    </option>
                  ))}
                />
              </div>
              <div className="w-1/2 md:w-1/3 px-1">
                <label className="block text-center my-2">Område:</label>
                <FormSelect
                  name="constituency"
                  defaultOption="Alle"
                  options={this.props.constituencyList.map(constituency => (
                    <option value={constituency.id} key={constituency.id}>
                      {constituency.constituency}
                    </option>
                  ))}
                />
              </div>
              <div className="w-1/2 md:w-1/3 px-1">
                <label className="block text-center my-2">Sorter efter:</label>
                <FormSelect
                  name="sortOrder"
                  options={sortOrder.map(sortOption => (
                    <option value={sortOption} key={sortOption}>
                      {sortOption}
                    </option>
                  ))}
                />
              </div>
            </form>
            <div className="w-full md:w-1/4 flex px-1 py-2 md:py-0">
              {userIsCandidate ? (
                <Link to={`/candidate/${user.id}`} className="flex-auto btn btn-white">
                  <FeatherIcon name="User" className="mr-2" />Mit kandidatur
                </Link>
              ) : (
                <a href="https://initiativet.dk/stilop" target="_stilop" className="flex-auto btn btn-white">
                  <FeatherIcon name="UserPlus" className="mr-2" />Bliv kandidat
                </a>
              )}
            </div>
          </div>
          {candidateList.length ? (
            <ul className="list-reset flex flex-wrap -m-1">
              {candidateList.map((candidate, index) => (
                <li key={index} className="w-full md:w-1/4 p-1">
                  <Link
                    to={`/candidate/${candidate.id}`}
                    className="flex flex-row md:flex-col h-full bg-white border border-grey-lighter rounded-sm shadow hover:shadow-md overflow-hidden">
                    <div className="flex-none relative">
                      <img
                        src={candidate.picture ? candidate.picture + '?w=464&h=464&fit=fill' : '/assets/candidate.png'}
                        alt={candidate.firstname + ' ' + candidate.lastname}
                        className="block w-full max-w-2xs md:max-w-full"
                      />
                      <h4 className="absolute pin-x pin-b text-center text-white md:text-xl font-bold bg-transparent-to-black pt-4 pb-2 mb-0">
                        {candidate.firstname + ' ' + candidate.lastname}
                      </h4>
                      <span className="absolute pin-t pin-r text-white bg-teal leading-none rounded-sm px-2 py-1 m-1">
                        {candidate.support}
                      </span>
                    </div>
                    <div className="overflow-hidden flex-auto flex flex-col p-4 md:pt-2">
                      <span className="block md:text-center text-grey uppercase mb-2">
                        {candidate.constituency.constituency}
                      </span>
                      {candidate.commitments.length > 0 ? (
                        <ul className="list-reset flex-auto flex flex-col justify-center">
                          {candidate.commitments.map((commitment, index) => (
                            <li key={index} className="block leading-normal truncate">
                              <FeatherIcon name={commitment.category.feathericon} className="text-teal mr-2" />
                              {commitment.category.title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex-auto flex items-center md:justify-center">
                          <span className="font-bold">Ny kandidat</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Der er desværre ingen kandidater der passer din søgning. Prøv en ny søgning.</p>
          )}
        </div>
      </div>
    );
  }
}

export default Candidates;
