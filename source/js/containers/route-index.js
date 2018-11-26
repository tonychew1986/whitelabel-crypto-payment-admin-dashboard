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

import Breadcrumb from '../components/Breadcrumb';

////

class PageIndex extends Component {

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

  _sampleFunction = (e) => {

  }


  render() {
    return (
      <div className={cx('page')}>
        <Breadcrumb grandparent="index" parent="" child="" grandchild="" grandparentLink="" parentLink="" childLink="" grandchildLink="" />
        <div className={cx('pageInner')}>
          <div>
            new merchants
          </div>
          <div>
            new consumers
          </div>
          <div>
            Hightlight of the week
          </div>
          <div className={cx('clear')}></div>
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
