import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DropdownItem extends Component {
  render() {
    const to = this.props.to;
    const itemName = this.props.itemName;
    const onClick = this.props.onClick;
    return (
      <li>
        <Link className="block hover:bg-black rounded-sm p-2" to={to} onClick={onClick}>
          {itemName}
        </Link>
      </li>
    );
  }
}

export default DropdownItem;
