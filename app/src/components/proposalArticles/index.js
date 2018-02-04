import React, { Component } from 'react';
import '../votePage/style.css';
import UpDownVote from '../widgets/UpDownVote';

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
    fetch(`/api/article/${proposalid}`, {
      method: 'POST',
      body: JSON.stringify({
        article: this.state.article
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const modal = document.getElementById('submitmodal');
    modal.style.display = 'flex';
    const btn = document.getElementById('closemodal');
    btn.onclick = function() {
      modal.style.display = 'none';
    };
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
    document.getElementById('articleform').reset();
  }

  render() {
    const articles = this.props.articles;
    return (
      <div>
        <ul>
          {articles.map(function(article, index) {
            const title = article.title;
            const description = article.preview;
            const publisher = article.publisher;
            const imageUrl = article.imgurl;
            return (
              <li key={index}>
                <UpDownVote type="article" score={article.score} id={article.id} uservote={article.uservote} />
                <a href={article.linkurl} target="_newtab">
                  <div>
                    <img src={imageUrl} alt={description} />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <small>{publisher}</small>
                    <p>{description}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <h1>Mangler der noget? Giv us et heads-up.</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="url" placeholder="Indsæt link her" onChange={this.handleChange} />
          <button type="submit">Indsend</button>
        </form>
        <div>
          <div>
            <h3>Tak for dit bidrag</h3>
            <p>En af vores redaktører laver review på artiklen og uploader den til lovforslaget inden længe.</p>
            <button>Forstået</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProposalArticles;
