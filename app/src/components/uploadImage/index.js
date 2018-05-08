import React, { Component } from 'react';

class uploadImage extends Component {
  constructor() {
    super();
    this.state = {};
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    const imageUrl = window.URL.createObjectURL(event.target.files[0]);
    this.setState({ imageUrl });
  }

  render() {
    let profilePicStyle = {
      backgroundImage:
        'url(' +
        (this.state.imageUrl ||
          this.props.candidate.picture + '?w=384&h=384&fit=fill' ||
          '../../assets/candidate.png') +
        ')'
    };

    return (
      <div className="block my-8">
        <span className="block font-bold mb-2">Profilbillede*</span>

        <p className="max-w-xs text-sm mb-3">
          Vælg et profilbillede med dit ansigt i midten, som er minimum 400x400px og under 2mb stort.
        </p>

        <div style={profilePicStyle} className="h-48 w-48 bg-cover bg-center rounded-sm mb-2" />

        <div>
          <input
            id="image-input"
            name={this.props.name}
            onChange={this.updateInput}
            type="file"
            accept="image/*"
            className="hidden"
          />
          <button>
            <label htmlFor="image-input" className="relative btn btn-primary cursor-pointer transition">
              Skift foto
            </label>
          </button>
        </div>
      </div>
    );
  }
}

export default uploadImage;
