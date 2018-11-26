import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import reducer from './reducers';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

//import Route from './AuthRoute';
//import Login from './Login';
//import Private from './Private';

import Store from './store';
import App from './containers/app'

//import stylesheets here?

let StoreInstance = Store();
let persistor = persistStore(StoreInstance);

ReactDOM.render((
    <Provider store={StoreInstance}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <App store={StoreInstance} />
        </HashRouter>
      </PersistGate>
    </Provider>
), document.getElementById('pageApplication'))
