import R from 'ramda';
import React, { Component } from 'react';
import FormSelect from '../../components/formSelect';
import { Link } from 'react-router-dom';

class Candidates extends Component {
  render() {
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <h1>Kandidater</h1>
          <div className="flex flex-wrap -mx-1 -mt-2 mb-4">
            <div className="w-full md:w-1/2 px-1">
              <label className="block text-center my-2">Interesse:</label>
              <FormSelect name="category" defaultOption="Alle" options={<option>Kategori</option>} />
            </div>
            <div className="w-1/2 md:w-1/4 px-1">
              <label className="block text-center my-2">Område:</label>
              <FormSelect name="category" defaultOption="Alle" options={<option>Kategori</option>} />
            </div>
            <div className="w-1/2 md:w-1/4 px-1">
              <label className="block text-center my-2">Sorter efter:</label>
              <FormSelect name="category" defaultOption="Alle" options={<option>Kategori</option>} />
            </div>
          </div>
          <Link
            to="/candidate/id"
            className="block relative flex bg-white border border-grey-lighter rounded-sm shadow hover:shadow-md overflow-hidden my-2">
            <img
              src="https://source.unsplash.com/TV1QYUtTxJ8/200x200"
              alt="Jens Hansen"
              className="block h-32 w-32 flex-none mx-auto"
            />
            <div className="flex-auto flex flex-col justify-center px-8 py-4 md:pr-16">
              <h4 className="mb-2">Jens Hansen</h4>
              <span className="block text-grey-darker">49 støtter</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Candidates;
