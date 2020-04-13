import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reducerRecipe from "./store/reducers/reducerRecipe"
import reducerAuth from "./store/reducers/reducerAuth"
import thunk from "redux-thunk"

// Sujungiam reducer'ius
const rootReducer = combineReducers({
    reducer_Recipe: reducerRecipe,
    reducer_Auth: reducerAuth
})

// Store
const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
console.log("[STORE]", store.getState())

// Subscription
store.subscribe(() => {
    console.log("[Subscription]", store.getState())
})

// Dispatching Action
console.log("[DISPATCHING]", store.getState())

//
const app= (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();