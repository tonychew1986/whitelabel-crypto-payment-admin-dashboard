import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class TransactionList extends React.Component {
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
          {this.props.merchantId}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.paymentType}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.shippingName}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.shippingEmail}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.shippingMobile}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.shippingCountry}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.shippingAddress}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.shippingPostal}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.createdAt}
        </div>
        <div className={cx('userListEntry')}>
          {this.props.transactionStatus}
        </div>
        <div className={cx('userListEntry')}>
          <button onClick={() => this.props._deleteTransaction(this.props.id)}>
            Delete Transaction
          </button>
        </div>
        <div className={cx('clear')}></div>
      </div>
    );
  }
}
