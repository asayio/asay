import React, { Component } from 'react';
import R from 'ramda';
import FormSelect from '../../components/formSelect';
import FeatherIcon from '../../components/featherIcon';
import { Link } from 'react-router-dom';

class Candidates extends Component {
  constructor() {
    super();
    this.state = {
      category: 'Alle',
      constituency: 'Alle',
      sortOrder: 'Flest støtter'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
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

    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <h1>Kandidater</h1>
          <form
            onChange={this.handleChange}
            onSubmit={e => e.preventDefault()}
            className="flex flex-wrap -mx-1 -mt-2 mb-4">
            <div className="w-full md:w-1/2 px-1">
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
            <div className="w-1/2 md:w-1/4 px-1">
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
            <div className="w-1/2 md:w-1/4 px-1">
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
          {candidateList.length ? (
            <ul className="list-reset flex flex-wrap -m-1">
              {candidateList.map((candidate, index) => (
                <li key={index} className="w-full md:w-1/4">
                  <Link
                    to={`/candidate/${candidate.id}`}
                    className="flex flex-row md:flex-col bg-white border border-grey-lighter rounded-sm shadow hover:shadow-md overflow-hidden m-1">
                    <div className="flex-none relative">
                      <img
                        src={candidate.picture}
                        alt={candidate.firstname + ' ' + candidate.lastname}
                        className="block w-full max-w-2xs md:max-w-full"
                      />
                      <h4 className="absolute pin-x pin-b text-center text-white text-xl font-bold bg-transparent-to-black pt-4 pb-2 mb-0">
                        {candidate.firstname + ' ' + candidate.lastname}
                      </h4>
                      <span className="absolute pin-t pin-r text-white bg-teal leading-none rounded-sm p-1 m-1">
                        {candidate.support}
                      </span>
                    </div>
                    <div className="overflow-hidden flex flex-col justify-center p-4 md:pt-2">
                      <span className="block md:text-center text-grey uppercase mb-2">
                        {candidate.constituency.constituency}
                      </span>
                      <ul className="list-reset">
                        {candidate.commitments.map((commitment, index) => (
                          <li key={index} className="block leading-normal truncate">
                            <FeatherIcon name={commitment.category.feathericon} className="text-teal mr-2" />
                            {commitment.category.title}
                          </li>
                        ))}
                      </ul>
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
