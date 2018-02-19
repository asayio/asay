import React, { Component } from 'react';
import R from 'ramda';
import FormSelect from '../../components/formSelect';
import FeatherIcon from '../../components/featherIcon';
import { Link } from 'react-router-dom';

class Candidates extends Component {
  render() {
    console.log(this.props.candidateList);
    const candidateList = R.filter(candidate => {
      return candidate.active;
    }, this.props.candidateList);
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <h1>Kandidater</h1>
          <div className="flex flex-wrap -mx-1 -mt-2 mb-4">
            <div className="w-full md:w-1/2 px-1">
              <label className="block text-center my-2">Interesse:</label>
              <FormSelect name="category" defaultOption="Alle" options={<option>Skat</option>} />
            </div>
            <div className="w-1/2 md:w-1/4 px-1">
              <label className="block text-center my-2">Område:</label>
              <FormSelect name="category" defaultOption="Alle" options={<option>København</option>} />
            </div>
            <div className="w-1/2 md:w-1/4 px-1">
              <label className="block text-center my-2">Sorter efter:</label>
              <FormSelect name="category" options={<option>Flest støtter</option>} />
            </div>
          </div>
          <ul className="list-reset flex flex-wrap -m-1">
            {candidateList.map((candidate, index) => (
              <li key={index} className="w-full md:w-1/4">
                <Link
                  to={`/candidate/${candidate.id}`}
                  className="flex flex-row md:flex-col bg-white border border-grey-lighter rounded-sm shadow hover:shadow-md overflow-hidden m-1">
                  <div className="relative">
                    <img
                      src={candidate.picture}
                      alt={candidate.firstname + ' ' + candidate.lastname}
                      className="block w-full max-w-2xs md:max-w-full"
                    />
                    <h4 className="absolute pin-x pin-b text-center text-white text-xl font-bold bg-transparent-to-black pt-4 pb-2 mb-0">
                      {candidate.firstname + ' ' + candidate.lastname}
                    </h4>
                    <span className="absolute pin-t pin-r text-white bg-teal leading-none rounded-sm p-1 m-1">149</span>
                  </div>
                  <div className="flex flex-col justify-center p-4 md:pt-2">
                    <span className="block md:text-center text-grey uppercase mb-2">
                      {candidate.constituency.district}
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
        </div>
      </div>
    );
  }
}

export default Candidates;
