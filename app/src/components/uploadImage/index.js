import React, { Component } from 'react';

class uploadImage extends Component {
  constructor() {
    super();
    this.state = {};
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    const imageUrl = window.URL.createObjectURL(event.target.files[0])
    this.setState({imageUrl})
  }

  render() {
    return (
      <div>
        <h1>upload dit kønne ansigt</h1>
        <input id="image-input" name={this.props.name} onChange={this.updateInput} type="file" accept="image/*"/>
        <img id="image-to-upload" src={this.state.imageUrl || this.props.candidate.picture || '../../assets/candidate.png'} alt="upload et billede"></img>
      </div>
    );
  }
}

export default uploadImage;
