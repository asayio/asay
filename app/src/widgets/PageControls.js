import React, { Component } from 'react';

export default class PageControls extends Component {
  render () {
    const changePage = this.props.changePage
    const page = this.props.page
    const nextLink = this.props.nextLink
    return (
      <div>
        {page >= 2 &&
          <button name='openDataPage' value={page - 1} onClick={changePage}>forrige side</button>}
        {nextLink &&
          <button name='openDataPage' value={page + 1} onClick={changePage}>næste side</button>}
      </div>
    )
  }
}
