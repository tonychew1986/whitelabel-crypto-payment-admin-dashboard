import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';


import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);


import ProfileSettings from '../components/ProfileSettings';
import ChangePassword from '../components/ChangePassword';
import EmailSettings from '../components/EmailSettings';
import SecuritySettings from '../components/SecuritySettings';
import Breadcrumb from '../components/Breadcrumb';

class PageSettings extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordCheck: '',
      passwordCheckError: false,
    }

  }

  componentDidMount(){
    // if have either accessToken of localstorage or props then stay, else leave
    if((localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) || (this.props.app.accessToken !== "" && this.props.app.accessToken !== null)){
      this.props.appActions.checkNetwork();
    }else{
      this.props.history.push('/login');
    }

  }
  _passwordEditUpdate = (e) => {
    e.preventDefault();

    if(this.state.newPassword == this.state.newPasswordCheck && this.state.newPassword !== "" && this.state.oldPassword !== ""){
      this.setState({
        passwordCheckError: false
      })
      this.props.appActions.updatePassword(this.state.oldPassword, this.state.newPassword);
    }else{
      this.setState({
        passwordCheckError: true
      })
    }
  }
  _oldPasswordChange = (e) => {
    this.setState({oldPassword: e.target.value});
  }

  _newPasswordChange = (e) => {
    this.setState({newPassword: e.target.value});
  }
  _newPasswordCheckChange = (e) => {
    this.setState({newPasswordCheck: e.target.value});
  }

  _emailNotificationChange = (e) => {

  }

  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="settings" parent="" child="" grandchild="" grandparentLink="" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <ProfileSettings />
          <EmailSettings emailNotificationState={this.props.app.emailNotificationState} _emailNotificationChange={this._emailNotificationChange} />
          <ChangePassword oldPassword={this.state.oldPassword} _oldPasswordChange={this._oldPasswordChange}  newPassword={this.state.newPassword} _newPasswordChange={this._newPasswordChange}  newPasswordCheck={this.state.newPasswordCheck} _newPasswordCheckChange={this._newPasswordCheckChange} _passwordEditUpdate={this._passwordEditUpdate} passwordCheckError={this.state.passwordCheckError} passwordUpdateError={this.props.app.passwordUpdateError} passwordUpdateSucess={this.props.app.passwordUpdateSucess} />
          <SecuritySettings />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    return {
        app: state.app
    };
}
function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageSettings);
