import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavItem extends Component {
  render() {
    const to = this.props.to;
    const text = this.props.text;
    return (
      <Link
        className="inline-block font-bold hover:bg-grey-lightest rounded-sm py-2 px-3 mr-2"
        to={to}
        onMouseDown={e => e.preventDefault()}>
        {text}
      </Link>
    );
  }
}

export default NavItem;
