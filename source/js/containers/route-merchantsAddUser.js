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

import MerchantUserForm from '../components/MerchantUserForm';
import Breadcrumb from '../components/Breadcrumb';

////

class PageMerchantsAddUser extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
        passwordCheckError: false
      }
  }

  componentDidMount(){
    this.props.appActions.checkNetwork();
  }

  _addMerchantUser = (e) => {
    e.preventDefault();

    if(this.state.password == this.state.passwordCheck && this.state.password !== ""){
      this.setState({
        passwordCheckError: false
      })
      this.props.appActions.addMerchantUser(this.state.name, this.state.email, this.state.password);
      //this.props.router.push('/foo')
      this.props.history.push('/merchants/users');
    }else{
      this.setState({
        passwordCheckError: true
      })
    }
  }
  _nameChange = (e) => {
    this.setState({name: e.target.value});
  }
  _emailChange = (e) => {
    this.setState({email: e.target.value});
  }
  _passwordChange = (e) => {
    this.setState({password: e.target.value});
  }
  _passwordCheckChange = (e) => {
    this.setState({passwordCheck: e.target.value});
  }

  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="merchants" parent="users" child="form" grandchild="" grandparentLink="/merchants" parentLink="/merchants/users" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('panelEntrance')}>
            <MerchantUserForm passwordCheckError={this.state.passwordCheckError} name={this.state.name} email={this.state.email} password={this.state.password} passwordCheck={this.state.passwordCheck} _addMerchantUser={this._addMerchantUser} _nameChange={this._nameChange} _emailChange={this._emailChange} _passwordChange={this._passwordChange} _passwordCheckChange={this._passwordCheckChange} />
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
export default connect(mapStateToProps, mapDispatchToProps)(PageMerchantsAddUser);
