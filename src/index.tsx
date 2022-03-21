import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const sagaMiddleware = createSagaMiddleware();
const middlewareEnhancers = applyMiddleware(sagaMiddleware);

const composedEnhanced = composeEnhancers(middlewareEnhancers);
const store = createStore(rootReducer, {}, composedEnhanced);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
