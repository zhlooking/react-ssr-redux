import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './actions';

export default preloadedState => createStore(reducer, preloadedState, applyMiddleware(thunk));
