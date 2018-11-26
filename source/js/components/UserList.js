import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class UserList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  componentDidMount(){

  }

  _sampleFunction = () => {

  }

  render() {
    let merchantDisplay;
    let consumerDisplay;

    if(this.props.role == "merchant"){
      merchantDisplay = (
        <button onClick={() => this.props._changeUserRole(this.props.id, this.props.name, "user")}>
          Downgrade to consumer
        </button>
      )
    }else{
      merchantDisplay = (
        <div>
        </div>
      )
    }
    if(this.props.role == "user"){
      consumerDisplay = (
        <button onClick={() => this.props._changeUserRole(this.props.id, this.props.name, "merchant")}>
          Upgrade to merchant
        </button>
      )
    }else{
      consumerDisplay = (
        <div>
        </div>
      )
    }

    return (
      <div className={cx('userList')}>
        <div className={cx('userListEntry')}>
          {this.props.id}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.userId}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.role}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.name}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.email}
        </div>
        <div className={cx('userListEntry')}>
          {merchantDisplay}
          {consumerDisplay}
        </div>
        <div className={cx('userListEntry')}>
          <button onClick={() => this.props._deleteUser(this.props.id)}>
            Delete
          </button>
        </div>
        <div className={cx('clear')}></div>
      </div>
    );
  }
}
