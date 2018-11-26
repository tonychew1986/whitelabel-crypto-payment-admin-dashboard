import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

import Select from 'react-select';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class MerchantAccountForm extends React.Component {
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
        <form onSubmit={(e) => this.props._addMerchantAccount(e)}>
          <div>
            Merchant Name:
          </div>
          <div>
            <input type="text" name="name" value={this.props.name} onChange={this.props._nameChange} required />
          </div>
          <div>
            Key Contact Person:
          </div>
          <div>
            <Select
              name="form-field-name"
              value={this.props.accountOwner}
              onChange={this.props._accountOwnerChange}
              options={this.props.merchantUserListOptions}
            />
          </div>
          <div>
            Merchant Physical Address:
          </div>
          <div>
            <input type="text" name="address" value={this.props.address} onChange={this.props._addressChange}  />
          </div>
          <div>
            Key Contact Phone:
          </div>
          <div>
            <input type="text" name="phone" value={this.props.mobile} onChange={this.props._mobileChange}  />
          </div>
          <div>
            <button>
              Create Account
            </button>
          </div>
          <div className={cx('clear')}></div>
        </form>
      </div>
    );
  }
}
