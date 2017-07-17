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
                <a href = {article.linkurl} className="db near-black ba b--light-gray br2 mv3 h10 overflow-hidden card">
                  <div className="dib w-30 h10 br b--light-gray overflow-hidden">
                    <img src = {article.imgurl} alt = {article.preview} className="h-100 mw-100" />
                  </div>
                  <div className="dib w-70 v-top pv1 ph3">
                    <h3>
                      {article.title}
                    </h3>
                    <small className="f5 small-caps ttl silver">
                      {article.publisher}
                    </small>
                    <p className="dark-gray">
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
