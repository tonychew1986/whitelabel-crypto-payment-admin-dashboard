import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  componentDidMount(){

  }

  render() {
    return (
      <div className={cx('navigation')}>
        <div className={cx('navigationLogo')}>
          <Link to='/'>
            <img src="../img/aropay.png" />
          </Link>
        </div>
        <div className={cx('navigationDashboardIndicator')}>
          <div>{this.props.dashboardType}</div>
          <div>Dashboard</div>
        </div>
        <div className={cx('navigationEntries')}>
          <div className={cx('navigationEntry')}>
            <Link to='/admins'>
              admins
            </Link>
          </div>
          <div className={cx('navigationEntry')}>
            <Link to='/merchants'>
              merchants
            </Link>
          </div>
          <div className={cx('navigationEntry')}>
            <Link to='/consumers'>
              consumers
            </Link>
          </div>
          <div className={cx('navigationEntry')}>
            <Link to='/invoices'>
              invoices
            </Link>
          </div>
          <div className={cx('navigationEntry')}>
            <Link to='/financials'>
              financials
            </Link>
          </div>
          <div className={cx('navigationEntry')}>
            <Link to='/settlements'>
              settlements
            </Link>
          </div>
          <div className={cx('navigationEntry')}>
            <Link to='/settings'>
              settings
            </Link>
          </div>
          <div className={cx('clear')}></div>
        </div>
        <div className={cx('navigationLogout')}>
          <Link to='/logout'>
            <button>
              Log out
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
