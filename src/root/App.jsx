import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router-dom";
import { configureStore, history } from "../store";
import Routes from "./Routes";

const store = configureStore();
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history()}>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
