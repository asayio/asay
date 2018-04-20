import React, { Component } from 'react';

class ProposalInfo extends Component {
  render() {
    const emptyParagraphHandler = [
      `Dette afsnit findes desværre ikke for dette forslag endnu. Du kan i stedet læse selve forslaget i PDF-form ved at
    klikke på 'Læs forslag'-knappen.`
    ];
    const paragraphs = this.props.paragraphs.length > 0 ? this.props.paragraphs : emptyParagraphHandler;
    return (
      <article className="flex-auto bg-white border border-grey-lighter rounded-sm shadow px-4 md:px-8 py-8 m-1">
        {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </article>
    );
  }
}

export default ProposalInfo;
