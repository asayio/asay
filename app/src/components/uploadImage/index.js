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
    return (
      <div className="block my-8">
        <span className="block font-bold mb-2">Profilbillede*</span>
        <label htmlFor="image-input" className="relative block w-48 h-48">
          <img
            id="image-to-upload"
            src={this.state.imageUrl || this.props.candidate.picture || '../../assets/candidate.png'}
            alt="Dit profilbillede"
          />
          <span className="absolute pin-x pin-b btn btn-primary cursor-pointer transition">Skift foto</span>
          <input
            id="image-input"
            name={this.props.name}
            onChange={this.updateInput}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
    );
  }
}

export default uploadImage;
