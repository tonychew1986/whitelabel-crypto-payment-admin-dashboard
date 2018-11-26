import app from './app';
import home from './home';

import { reducer as formReducer } from 'redux-form'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { combineReducers } from 'redux';

const rootPersistConfig = {
  key: 'root',
  storage: storage
}


const rootReducer = combineReducers({
    app,
    home,
    form: formReducer,
    routing: routerReducer
});
export default persistReducer(rootPersistConfig, rootReducer);
