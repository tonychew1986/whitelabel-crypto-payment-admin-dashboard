import { createStore, applyMiddleware, compose } from 'redux';
//import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from  './reducers';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';


// const composeEnhancers = composeWithDevTools({ realtime: true });
// const middleware = composeEnhancers(applyMiddleware(promise(), thunk, logger));
const middleware = (applyMiddleware(promise(), thunk, logger));

const initialState = {

};

export default(initialState) => {
    return createStore(rootReducer, initialState, middleware);
}
