import React, { Component } from 'react';
import { ArrowLeft } from 'react-feather';

class EditCandidatePage extends Component {
  render() {
    if (true) {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <h1>Rediger kandidatprofil</h1>
            <div className="bg-white border border-grey-lighter rounded-sm shadow p-8" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Hovsa...</h1>
          <p>Det er da vist ikke din projekt. Lad hellere initiativtageren stå for redigeringen.</p>
          <a onClick={() => window.history.back()}>
            <ArrowLeft /> Gå tilbage
          </a>
        </div>
      );
    }
  }
}

export default EditCandidatePage;
