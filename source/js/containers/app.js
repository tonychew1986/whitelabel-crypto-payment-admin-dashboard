import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Router, Switch, Redirect, Link } from 'react-router-dom';

import axios from 'axios';

//import '../../scss/commons.scss';

import classnames from 'classnames/bind';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

//import PrivateRoute from './PrivateRoute';

import PageLogin from './route-login';
import PageLogout from './route-logout';

import PageIndex from './route-index';
import PageMerchants from './route-merchants';
import PageMerchantsAddUser from './route-merchantsAddUser';
import PageMerchantsAddAccount from './route-merchantsAddAccount';
import PageMerchantsEditAccount from './route-merchantsEditAccount';
import PageMerchantsViewAccount from './route-merchantsViewAccount';
import PageMerchantsViewAccountGenerate from './route-merchantsViewAccountGenerate';

import PageMerchantsUsers from './route-merchantsUsers';
import PageMerchantsAccounts from './route-merchantsAccounts';

import PageAdmins from './route-admins';
import PageAdminsAddUser from './route-adminsAddUser';
import PageAdminsUsers from './route-adminsUsers';

import PageConsumers from './route-consumers';
import PageConsumersUsers from './route-consumersUsers';
import PageSettings from './route-settings';

import PageInvoices from './route-invoices';
import PageSettlements from './route-settlements';

import PageTransactions from './route-transactions';

import PageFinancials from './route-financials';
import PageFinancialsInternal from './route-financialsInternal';
import PageFinancialsMerchant from './route-financialsMerchant';
import PageFinancialsConsumer from './route-financialsConsumer';

import Navigation from '../components/Navigation';

const isAuthenticated = () => true;

//const PRIVATE_ROOT = '/private';
const PUBLIC_ROOT = '/login';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isPrivate } = component;
  if (isAuthenticated()) {
    //User is Authenticated
    //if (isPrivate === true) {
      //If the route is private the user may proceed.
      return <Route { ...props } component={ component } />;
    //}else {
      //If the route is public, the user is redirected to the app's private root.
      //return <Redirect to={ PRIVATE_ROOT } />;
    //}
  }else {
    //User is not Authenticated
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ PUBLIC_ROOT } />;
    }else {
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
  }
};

const EmptyLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      <div>
        <Component {...props} />
      </div>
    )} />
  )
};

const PortalLayout = ({component: Component, authed, ...rest}) => {
  //const { isPrivate } = component;

  //if (authed === true) {
    //User is Authenticated
    //if (isPrivate === true) {
      //If the route is private the user may proceed.
      return (
        <Route {...rest} render={props => (
          <div className="uiWrapper">
            <Navigation dashboardType="admin" />
            <Component {...props} />
          </div>
        )} />
      )
    //}else {
      //If the route is public, the user is redirected to the app's private root.
      //return <Redirect to={ PRIVATE_ROOT } />;
    //}
  //}else {
    //User is not Authenticated
    //if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      //return <Redirect to={ PUBLIC_ROOT } />;
    //}else {
      //If the route is public, the user may proceed.
      //return <Route { ...props } component={ component } />;
    //}
  //}
};

//export const getRoutes = (store) => (
//  const authRequired = (nextState, replaceState) => {
//    // Now you can access the store object here.
//    const state = store.getState();
//
//    //if (!state.user.isAuthenticated) {
//    //  // Not authenticated, redirect to login.
//    //  replaceState({ nextPathname: nextState.location.pathname }, '/login');
//    //}
//  };
//
//  //return (
//  //  <Route   path="/"         component={App}>
//  //    <IndexRoute             component={Landing} />
//  //    <Route path="learn"     component={Learn} />
//  //    <Route path="about"     component={About} />
//  //    <Route path="downloads" component={Downloads} onEnter={authRequired} />
//  //  </Route>
//  //);
//)

//var requireAuth = (store, nextState, replace) => {
//  console.log("store: ", store);
//  //now you have access to the store in the onEnter hook!
//}

class App extends Component {
//const App = (store) => (
  constructor(props, context) {
    super(props, context);

    this.state={
      authed: true
    }
  }
  componentDidUpdate() {
    window.scrollTo(0,0);
    console.log("componentDidUpdate");
    //console.log(this.state.app.loginStatus);
  }
  render() {
    return (
      <div className={cx('App')}>

        <Switch>
          <EmptyLayout exact path='/login' component={PageLogin} />
          <EmptyLayout exact path='/logout' component={PageLogout} />

          <PortalLayout exact path='/' component={PageIndex} />

          <PortalLayout exact path='/admins' component={PageAdmins} />
          <PortalLayout exact path='/admins/add/user' component={PageAdminsAddUser} />
          <PortalLayout exact path='/admins/users' component={PageAdminsUsers} />

          <PortalLayout exact path='/merchants' component={PageMerchants} />
          <PortalLayout exact path='/merchants/add/account' component={PageMerchantsAddAccount} />
          <PortalLayout exact path='/merchants/edit/account/:id' component={PageMerchantsEditAccount} />
          <PortalLayout exact path='/merchants/view/account/:id' component={PageMerchantsViewAccount} />
          <PortalLayout exact path='/merchants/view/account/:id/generate' component={PageMerchantsViewAccountGenerate} />
          <PortalLayout exact path='/merchants/add/user' component={PageMerchantsAddUser} />
          <PortalLayout exact path='/merchants/accounts' component={PageMerchantsAccounts} />
          <PortalLayout exact path='/merchants/users' component={PageMerchantsUsers} />

          <PortalLayout exact path='/consumers' component={PageConsumers} />
          <PortalLayout exact path='/consumers/users' component={PageConsumersUsers} />

          <PortalLayout exact path='/transactions' component={PageTransactions} />

          <PortalLayout exact path='/financials' component={PageFinancials} />
          <PortalLayout exact path='/financials/internal' component={PageFinancialsInternal} />
          <PortalLayout exact path='/financials/merchant' component={PageFinancialsMerchant} />
          <PortalLayout exact path='/financials/consumer' component={PageFinancialsConsumer} />

          <PortalLayout exact path='/invoices' component={PageInvoices} />
          <PortalLayout exact path='/settlements' component={PageSettlements} />

          <PortalLayout exact path='/settings' component={PageSettings} />
        </Switch>

      </div>
    )
  }
}

const NotFound = () => (<h1>404.. This page is not found!</h1>)

export default App
