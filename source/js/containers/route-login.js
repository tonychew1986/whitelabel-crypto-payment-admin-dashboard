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

import LoginForm from '../components/LoginForm';

////

class PageIndex extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
        email: "",
        password: ""
      }
  }

  componentDidMount(){
  }

  _login = (e) => {
    e.preventDefault();

    this.props.appActions.login(this.state.email, this.state.password);
  }
  _emailChange = (e) => {
    this.setState({email: e.target.value});
  }
  _passwordChange = (e) => {
    this.setState({password: e.target.value});
  }

  render() {
    if(this.props.app.loginStatus == true && this.props.app.accessToken !== ""){
      localStorage.setItem('accessToken', this.props.app.accessToken);
      this.props.history.push('/');
    }
    return (
      <div className={cx('page')}>
        <div className={cx('panelEntrance')}>
          <LoginForm headerTitle="Admin Dashboard" email={this.state.email} password={this.state.password} _login={this._login} _emailChange={this._emailChange} _passwordChange={this._passwordChange} loginAdminRightsError={this.props.app.loginAdminRightsError} />
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
export default connect(mapStateToProps, mapDispatchToProps)(PageIndex);
