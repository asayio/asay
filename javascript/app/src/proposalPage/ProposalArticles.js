import React, { Component } from 'react';
import '../votePage/style.css';

//handleChange, handleSubmit, modal and css are also defined in pollVote. Consider refactoring
class ProposalArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      article: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const proposalid = this.props.proposalInfo.id;
    fetch(`/api/article/${proposalid}`,
      {
        method: 'POST',
        body: JSON.stringify({
          article: this.state.article,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const modal = document.getElementById('submitmodal');
    modal.style.display = "flex";
    const btn = document.getElementById("closemodal");
    btn.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
    };
    document.getElementById("articleform").reset();
  };

  render() {
    const articles = this.props.articles;
    return (
      <div>
        <ul className="list pl0">
          {articles.map(function (article) {
            return (
              <li key = {article.id}>
                <a href = {article.linkurl} target="_blank" className="db near-black ba b--light-gray br2 mv3 h10 overflow-hidden card">
                  <div>
                    {article.score}
                  </div>
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
        <h1>Mangler der noget? Giv us et heads-up.</h1>
        <form id="articleform" onSubmit={this.handleSubmit}>
          <input type="url" placeholder="Indsæt link her" onChange={this.handleChange}></input>
          <button type="submit">Indsend</button>
        </form>
        <div id="submitmodal" className="modal">
          <div className="modal-content">
            <h3>Tak for dit bidrag</h3>
            <br/>
            <p>En af vores redaktører laver review på artiklen og uploader den til lovforslaget inden længe.<br/><br/><br/>
            <button id="closemodal">Forstået</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalArticles;
