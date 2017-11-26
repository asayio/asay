// Import
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import Button from '../Button'

// Component
class ProposalArticles extends Component {
  state = {
    url: {
      value: '',
      error: null,
      valid: null
    }
  }

  handleInputChange = e => {
    const key = e.target.name
    const value = e.target.value
    this.setState({
      [key]: {
        error: null,
        valid: null,
        value
      }
    })
  }

  handleInputBlur = e => {
    const key = e.target.name
    const value = e.target.value
    const isValid = true // validUrl(value)
    this.setState({
      [key]: {
        value,
        error: !isValid,
        valid: isValid
      }
    })
  }

  handleInputSubmit = e => {
    e.preventDefault()
    const { value, valid, error } = this.state.url
    if (value && valid) {
      //this.props.dispatch(submitArticle(value))
    }
  }

  render() {
    const { proposalArticles, user } = this.props
    return proposalArticles.isFetching === 'articles' ? (
      <div>
        <p>Henter artikler...</p>
      </div>
    ) : (
      <div>
        <form onSubmit={this.handleInputSubmit}>
          <label htmlFor="url">
            <span>Foreslå nyhed</span>
            <input
              type="text"
              name="url"
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
              value={this.state.url.value}
              placeholder="Indsæt url til nyhed"
              disabled={user.canSubmit ? false : 'disabled'}
            />
          </label>
          <Button type="submit" label="Tilføj" disabled={!user.canSubmit} />
        </form>
        {proposalArticles.data && proposalArticles.data.length ? (
          <div>
            {proposalArticles.data.filter(article => article.status === 'publish').map((article, index) => (
              <a href={article.url} target="_blank" key={article.id}>
                <div>
                  <img src={article.image || 'placeholder'} alt={article.headline} />
                </div>
                <div>
                  <h3>{article.headline}</h3>
                  <span>
                    {article.date || 'Ingen dato'} - {article.source.name}
                  </span>
                  <p>{article.description}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p>Vær den første til at foreslå en artikel!</p>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user,
  proposalArticles: state.proposal.article
}))(ProposalArticles)
