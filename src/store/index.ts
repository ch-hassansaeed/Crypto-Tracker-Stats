import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

export function configureStore(preloadedState: any) {
  const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhancers = applyMiddleware(sagaMiddleware);

  const composedEnhanced = composeEnhancers(middlewareEnhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhanced);

  sagaMiddleware.run(rootSaga);

  return store;
}
