import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

import Toggle from 'react-toggle'
import ReactTable from 'react-table'


import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);

import Breadcrumb from '../components/Breadcrumb';

class PageAdmins extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
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
  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="admins" parent="" child="" grandchild="" grandparentLink="" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div>
            <Link to="/admins/users">
              <button>
                View list of admin users
              </button>
            </Link>
            <Link to="/admins/add/user">
              <button>
                Add new admin user
              </button>
            </Link>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PageAdmins);
