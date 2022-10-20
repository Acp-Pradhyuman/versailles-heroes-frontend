import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducers/root-reducer";
import rootSaga from "./sagas";
export * from "./actions";
export * from "./selectors";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"]
};

const history = () => {
  return createBrowserHistory();
};

const enhancers = [];
// Dev tools are helpful
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__;
if (reduxDevTool) {
  if (typeof devToolsExtension === "function") {
    enhancers.push(reduxDevTool());
  }
}

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history()), sagaMiddleware];
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const allMiddlewares = applyMiddleware(...middlewares);
  const store = createStore(persistedReducer, !!enhancers.length ? compose(allMiddlewares, ...enhancers) : allMiddlewares);
  sagaMiddleware.run(rootSaga);
  return store;
};

export { configureStore, history };
