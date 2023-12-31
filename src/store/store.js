import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reduserLogin from './reducers';

const rootReducer = combineReducers({ reduserLogin });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;