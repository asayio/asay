import React, { Component } from 'react';
import CountDown from '../widgets/CountDown';
import {
  Link
} from 'react-router-dom';

class FilterList extends Component {
    constructor() {
        super();
        this.state = {
            optionList:[],
            title:'Overskrift',
        };

    }

    propTypes = {
        itemFunc: React.PropTypes.func, //Used for getting the value out of the item
        onChangeFunc : React.PropTypes.func,
    }

    render() {
        return (
            <div className="fl w-25 pa1">
                <select name="status" onChange={this.props.onChangeFunc} value={this.props.valueFunc} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                    <option>Alle</option>
                    {this.props.optionList.map((item) =>
                        <option key={item.id}>{this.props.itemFunc(item)}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default FilterList;