import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class LoginForm extends React.Component {
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
      <div>
        <div className={cx('loginFormTabs')}>
          <div className={cx('loginFormTab')}>
            Login
          </div>
          <div className={cx('loginFormTab', 'hide')}>
            <Link to="/registration">
              Registration
            </Link>
          </div>
          <div className={cx('clear')}></div>
        </div>
        <div className={cx('loginForm')}>
          <div className={cx('loginFormIcon')}>
            <img src="../img/aropay.png" />
          </div>
          <div className={cx('loginFormTitle')}>
            {this.props.headerTitle}
          </div>
          <form onSubmit={(e) => this.props._login(e)}>
            <div className={cx('loginFormField')}>
              <div className={cx('loginFormFieldTitle')}>
                Email:
              </div>
              <div>
                <input type="text" name="email" value={this.props.email} onChange={this.props._emailChange} required />
              </div>
            </div>
            <div className={cx('loginFormField')}>
              <div className={cx('loginFormFieldTitle')}>
                Password:
              </div>
              <div>
                <input type="password" name="password" value={this.props.password} onChange={this.props._passwordChange} required />
              </div>
            </div>
            <div className={cx('loginFormField', 'loginFormFieldForgotPassword')}>
              <Link to='/password/forgot'>
                Forgot your password?
              </Link>
            </div>
            <div className={cx('loginFormField')}>
              <button>
                Login
              </button>
            </div>
            <div className={cx('clear')}></div>
          </form>

          <div className={cx('loginFormError')}>
            {((this.props.loginAdminRightsError == true)  ? 'You do not have sufficient rights. Please contact the administrator to proceed further' : '')}
            {((this.props.loginAdminRightsError == true)  ? '' : 'Your login credential is invalid.')}
          </div>
        </div>
      </div>
    );
  }
}
