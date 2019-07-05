import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // from index.js

const initialState = {}; // all init state will be in reducers

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)) // %TODO: what about prod environment (?)
);

export default store;
