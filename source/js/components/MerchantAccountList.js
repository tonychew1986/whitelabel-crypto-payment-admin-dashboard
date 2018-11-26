import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class MerchantAccountList extends React.Component {
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
    return (
      <div className={cx('userList')}>
        <div className={cx('userListEntry')}>
          {this.props.id}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.name}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.owner}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.address}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.mobile}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.country}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.accountTier}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.accountStatus}
        </div>
        <div className={cx('userListEntry')}>
          <button onClick={() => this.props._deleteMerchantAccount(this.props.id)}>
            Delete Account
          </button>
        </div>
        <div className={cx('clear')}></div>
      </div>
    );
  }
}
