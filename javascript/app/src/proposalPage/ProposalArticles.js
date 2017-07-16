import React, { Component } from 'react';

class ProposalArticles extends Component {

  render() {
    const articles = this.props.articles;
    return (
      <div>
        <ul className="list pl0">
          {articles.map(function (article) {
            return (
              <li key = {article.id}>
                <a href = {article.linkurl} className="db overflow-hidden link near-black hover--mid-gray ba b--light-gray br2 mv3">
                  <img src = {article.imgurl} alt = {article.preview} className="w-30 fl" />
                  <div className="dib w-70 v-top pv1 ph3">
                    <h3>
                      {article.title}
                    </h3>
                    <small>
                      {article.publisher}
                    </small>
                    <p>
                      {article.preview}
                    </p>
                  </div>
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
