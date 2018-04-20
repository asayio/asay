import React, { Component } from 'react';
import R from 'ramda';
import { ArrowLeft } from 'react-feather';
import CandidateForm from '../../../components/candidateForm';

class EditCandidatePage extends Component {
  render() {
    const candidateId = Number(this.props.match.params.id);
    const candidate = R.find(R.propEq('id', candidateId), this.props.candidateList);
    const user = this.props.user;
    if (candidateId === user.id) {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <h1>Rediger kandidatprofil</h1>
            <CandidateForm
              match={this.props.match}
              updateState={this.props.updateState}
              candidate={candidate}
              constituencyList={this.props.constituencyList}
              user={this.props.user}
              preferenceList={this.props.preferenceList}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto text-center">
            <h1>Hovsa...</h1>
            <p className="mx-auto">Det er da vist ikke din profil. Lad hellere kandidaten selv stå for redigeringen.</p>
            <button onClick={() => window.history.back()} className="btn btn-white mt-4 mb-8">
              <ArrowLeft className="mr-2" />Gå tilbage
            </button>
          </div>
        </div>
      );
    }
  }
}

export default EditCandidatePage;
