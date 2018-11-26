import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class MerchantProfile extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  componentDidMount(){

  }

  render() {
    return (
      <div className={cx('merchantViewSnapshot')}>
        <div className={cx('merchantViewSnapshotPrimary')}>
          <div className={cx('merchantViewSnapshotPrimaryTier')}>
            {this.props.accountTier}
          </div>
          <div className={cx('merchantViewSnapshotPrimaryName')}>
            {this.props.name}
          </div>
          <div className={cx('merchantViewSnapshotPrimaryId')}>
            {this.props.merchantId}
          </div>
        </div>
        <div className={cx('merchantViewSnapshotSection')}>
          <div className={cx('merchantViewSnapshotSectionEntry')}>
            <div className={cx('merchantViewSnapshotSectionEntryTitle')}>
              Created:
            </div>
            <div className={cx('merchantViewSnapshotSectionEntryAnswer')}>
              {this.props.createdAt}
            </div>
          </div>
          <div className={cx('merchantViewSnapshotSectionEntry')}>
            <div className={cx('merchantViewSnapshotSectionEntryTitle')}>
              Country:
            </div>
            <div className={cx('merchantViewSnapshotSectionEntryAnswer')}>
              {this.props.country}
            </div>
          </div>
          <div className={cx('merchantViewSnapshotSectionEntry')}>
            <div className={cx('merchantViewSnapshotSectionEntryTitle')}>
              Physical Address:
            </div>
            <div className={cx('merchantViewSnapshotSectionEntryAnswer')}>
              {this.props.address}
            </div>
          </div>
          <div className={cx('merchantViewSnapshotSectionEntry')}>
            <div className={cx('merchantViewSnapshotSectionEntryTitle')}>
              Mobile:
            </div>
            <div className={cx('merchantViewSnapshotSectionEntryAnswer')}>
              {this.props.mobile}
            </div>
          </div>
          <div className={cx('merchantViewSnapshotSectionEntry')}>
            <div className={cx('merchantViewSnapshotSectionEntryTitle')}>
              Account Owner:
            </div>
            <div className={cx('merchantViewSnapshotSectionEntryAnswer')}>
              {this.props.ownerName}
            </div>
            <div className={cx('merchantViewSnapshotSectionEntryAnswer')}>
              {this.props.ownerId}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
