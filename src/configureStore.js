import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';

//base middleware
let middleware = [thunkMiddleware];

//append middleware for dev Env
if (process.env.NODE_ENV !== 'prod') {
  const logger = require('redux-logger').createLogger();
  // const logger = createLogger();
  middleware = [...middleware, logger];
} 

export default function configureStore() {
  return createStore(rootReducer, 
  	applyMiddleware(...middleware)
  )
}