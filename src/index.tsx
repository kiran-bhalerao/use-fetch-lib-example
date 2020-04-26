import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { App } from "./App";

ReactDOM.render(
  <Provider
    store={createStore(() => ({
      token: "This is a random auth token",
    }))}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
