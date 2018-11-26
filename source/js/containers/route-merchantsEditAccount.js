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

import MerchantAccountEditForm from '../components/MerchantAccountEditForm';
import Breadcrumb from '../components/Breadcrumb';

////

const merchantUserListOptions = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];

class PageMerchantsEditAccount extends Component {

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
    this.props.appActions.getMerchantAccountDetail(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      name: nextProps.app.currentAccount.name,
      address: nextProps.app.currentAccount.address,
      mobile: nextProps.app.currentAccount.mobile,
      accountOwner: {
        value: nextProps.app.currentAccount.ownerId,
        label: nextProps.app.currentAccount.ownerName
      }
    })
  }

  _updateMerchantAccount = (e) => {
    e.preventDefault();

    this.props.appActions.updateMerchantAccount(this.state.name, this.state.accountOwner.value, this.state.accountOwner.label, this.state.address, this.state.mobile, this.props.match.params.id);
  }

  _returnToMerchantList = () => {
    this.props.appActions.resetFormStatus();
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
    if(this.props.app.currentAccount.length == 0){
      return (
        <div className={cx('page')}>

        </div>
      )
    }else if(this.props.app.formStatus == "complete"){
      return (
        <div className={cx('page')}>
          <button onClick={() => {this._returnToMerchantList()}}>
            Back to merchant accounts
          </button>
        </div>
      )
    }else{
      return (
        <div className={cx('page')}>
          <Breadcrumb grandparent="merchants" parent="accounts" child="form" grandchild="" grandparentLink="/merchants" parentLink="/merchants/accounts" childLink="" grandchildLink="" />
          <div className={cx('pageInner')}>
            <div className={cx('panelEntrance')}>
              <MerchantAccountEditForm name={this.state.name} id={this.props.match.params.id} accountOwner={this.state.accountOwner} address={this.state.address} mobile={this.state.mobile} _updateMerchantAccount={this._updateMerchantAccount} _nameChange={this._nameChange} _mobileChange={this._mobileChange} _addressChange={this._addressChange} _accountOwnerChange={this._accountOwnerChange} merchantUserListOptions={this.props.app.userListForDropdown} />
            </div>
          </div>
        </div>
      )
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(PageMerchantsEditAccount);
