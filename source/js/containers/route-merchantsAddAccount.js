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

import MerchantAccountForm from '../components/MerchantAccountForm';
import Breadcrumb from '../components/Breadcrumb';

////

const merchantUserListOptions = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];

class PageMerchantsAddAccount extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
        name: "",
        address: "",
        mobile: "",
        accountOwner: ""
      }
  }

  componentDidMount(){
    this.props.appActions.checkNetwork();
    this.props.appActions.getUserList("merchant");
  }

  _addMerchantAccount = (e) => {
    e.preventDefault();

    this.props.appActions.addMerchantAccount(this.state.name, this.state.accountOwner, this.state.address, this.state.mobile);

    this.props.history.push('/merchants/accounts');
  }

  _nameChange = (e) => {
    this.setState({name: e.target.value});
  }
  _mobileChange = (e) => {
    this.setState({mobile: e.target.value});
  }
  _addressChange = (e) => {
    this.setState({address: e.target.value});
  }

  _accountOwnerChange = (accountOwner) => {
    this.setState({ accountOwner });
    console.log(`Selected: ${accountOwner.label}`);
  }

  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="merchants" parent="accounts" child="form" grandchild="" grandparentLink="/merchants" parentLink="/merchants/accounts" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('panelEntrance')}>
            <MerchantAccountForm name={this.state.name} accountOwner={this.state.accountOwner} address={this.state.address} mobile={this.state.mobile} _addMerchantAccount={this._addMerchantAccount} _nameChange={this._nameChange} _mobileChange={this._mobileChange} _addressChange={this._addressChange} _accountOwnerChange={this._accountOwnerChange} merchantUserListOptions={this.props.app.userListForDropdown} />
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
export default connect(mapStateToProps, mapDispatchToProps)(PageMerchantsAddAccount);
