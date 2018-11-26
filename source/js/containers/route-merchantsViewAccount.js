import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import * as pageActions from '../actions/home';

import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);


import Breadcrumb from '../components/Breadcrumb';
import MerchantProfile from '../components/MerchantProfile';
////


class PageMerchantsViewAccount extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
      }
  }

  componentDidMount(){
    this.props.appActions.getMerchantAccountDetail(this.props.match.params.id);
  }


  render() {
    var generateLink = "/merchants/view/account/"+this.props.app.currentAccount.merchantId+"/generate";

    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="merchants" parent="accounts" child="profile" grandchild="" grandparentLink="/merchants" parentLink="/merchants/accounts" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('merchantView')}>
            <MerchantProfile accountTier={this.props.app.currentAccount.accountTier} name={this.props.app.currentAccount.name} merchantId={this.props.app.currentAccount.merchantId} createdAt={this.props.app.currentAccount.createdAt} country={this.props.app.currentAccount.country} address={this.props.app.currentAccount.address} mobile={this.props.app.currentAccount.mobile} ownerName={this.props.app.currentAccount.ownerName} ownerId={this.props.app.currentAccount.ownerId} />
            <div className={cx('merchantViewContent')}>
              <Link to={generateLink}>
                <div id="generatePay" className={cx('merchantViewContentButton')}>
                    Generate Payment Button
                </div>
              </Link>
              <div className={cx('merchantViewContentButton')}>
                View Cryptocurrency Address
              </div>
              <div className={cx('merchantViewContentButton')}>
                Upgrade Account Tier
              </div>
              <div className={cx('merchantViewContentButton')}>
                Analytics
              </div>
            </div>
            <div className={cx('clear')}></div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    return {
        app: state.app,
        page: state.home
    };
}
function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageMerchantsViewAccount);
