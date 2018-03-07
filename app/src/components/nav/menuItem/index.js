import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuItem extends Component {
  render() {
    const to = this.props.to;
    const itemName = this.props.itemName;
    const onClick = this.props.onClick;
    return (
      <li className={this.props.className + ' inline-block mx-1'}>
        <Link className="inline-block font-bold hover:bg-grey-lightest rounded-sm p-2" to={to} onClick={onClick}>
          {itemName}
        </Link>
      </li>
    );
  }
}

export default MenuItem;
