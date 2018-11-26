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

import AdminUserForm from '../components/AdminUserForm';
import Breadcrumb from '../components/Breadcrumb';

////

class PageAdminsAddUser extends Component {

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

  _addAdmin = (e) => {
    e.preventDefault();

    if(this.state.password == this.state.passwordCheck && this.state.password !== ""){
      this.setState({
        passwordCheckError: false
      })
      this.props.appActions.addAdmin(this.state.name, this.state.email, this.state.password);
      //this.props.router.push('/foo')
      setTimeout(() => {
        this.props.history.push('/admins/users');
      }, 1000);
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
        <Breadcrumb grandparent="admins" parent="form" child="" grandchild="" grandparentLink="/admins" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div className={cx('panelEntrance')}>
            <AdminUserForm passwordCheckError={this.state.passwordCheckError} email={this.state.email} password={this.state.password} passwordCheck={this.state.passwordCheck} _addAdmin={this._addAdmin} _emailChange={this._emailChange} _passwordChange={this._passwordChange} _passwordCheckChange={this._passwordCheckChange} />
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
export default connect(mapStateToProps, mapDispatchToProps)(PageAdminsAddUser);
