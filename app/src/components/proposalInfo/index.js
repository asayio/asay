import React, { Component } from 'react';

class ProposalInfo extends Component {
  render() {
    const emptyParagraphHandler = [
      `Dette afsnit findes desværre ikke for dette forslag endnu. Du kan i stedet læse selve forslaget i PDF-form ved at
    klikke på 'Læs forslag'-knappen.`
    ];
    const paragraphs = this.props.paragraphs.length > 1 ? this.props.paragraphs : emptyParagraphHandler;
    return <div>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
  }
}

export default ProposalInfo;
