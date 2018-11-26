import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class AdminUserForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  componentDidMount(){

  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props._addAdmin(e)}>
          <div>
            Admin Name:
          </div>
          <div>
            <input type="text" name="email" value={this.props.name} onChange={this.props._nameChange} required />
          </div>
          <div>
            Email:
          </div>
          <div>
            <input type="text" name="email" value={this.props.email} onChange={this.props._emailChange} required />
          </div>
          <div>
            Password:
          </div>
          <div>
            <input type="password" name="password" value={this.props.password} onChange={this.props._passwordChange} required />
          </div>
          <div>
            Re-enter password:
          </div>
          <div>
            <input type="password" name="passwordCheck" value={this.props.passwordCheck} onChange={this.props._passwordCheckChange} required />
          </div>
          <div className={cx('error', ((this.props.passwordCheckError == false)  ? 'hide' : ''))}>
            The password you have entered does not match.
          </div>
          <div>
            <button>
              Add admin
            </button>
          </div>
          <div className={cx('clear')}></div>
        </form>
      </div>
    );
  }
}
