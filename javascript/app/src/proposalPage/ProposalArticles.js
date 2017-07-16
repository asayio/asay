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
                <a href = {article.linkurl}>
                  <h3>
                    {article.title}
                  </h3>
                  <small>
                    {article.publisher}
                  </small>
                  <img src = {article.imgurl} alt = {article.preview} />
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
