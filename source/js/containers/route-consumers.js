import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

import Toggle from 'react-toggle'

import axios from 'axios';
import renderHTML from 'react-render-html';
import escapeHTML from 'escape-html';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);

import Breadcrumb from '../components/Breadcrumb';


class PageConsumers extends Component {

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
        <Breadcrumb grandparent="consumers" parent="" child="" grandchild="" grandparentLink="" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <Link to="/consumers/users">
            <button>
              View list of consumers users
            </button>
          </Link>
          <div className={cx('clear')}></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PageConsumers);
