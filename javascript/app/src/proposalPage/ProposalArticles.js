import React, { Component } from 'react';

class ProposalArticles extends Component {

  render() {
    const articles = this.props.articles;
    return (
      <div className = 'proposal-articles'>
        <ul>
          {articles.map(function (article) {
            return (
              <li key = {article.id}>
                <div>
                </div>
                <a href = {article.linkurl}>
                  <h3>
                    {article.title}
                  </h3>
                  <small>
                    {article.publisher}
                  </small>
                  <img href = {article.imgurl} alt = {article.preview} />
                  <p>
                    {article.preview}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ProposalArticles;


2
imgurl
:
"https://www.information.dk/sites/all/modules/_inf/features/if_global_elements/images/og_default.png"
linkurl
:
"https://www.information.dk/telegram/2016/08/regeringen-indfoere-noedbremse-asylansoegere-1"
preview
:
"Regeringen vil indføre en nødbremse, så asylansøgere kan afvises ved grænsen. Samtidig skal der ikke tages imod flere kvoteflygtninge i 2016."
publisher
:
"www.information.dk"
score
:
"1"
title
:
"Regeringen vil indføre nødbremse for asylansøgere"
uservote
:
true
