import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import { UseFetchProvider } from "use-fetch-lib";
import { App } from "./App";

const Main = () => {
  return (
    <UseFetchProvider
      baseUrl="http://dummy.restapiexample.com"
      authorizationToken={useSelector((store: any) => store.token)}
    >
      <App />
    </UseFetchProvider>
  );
};

ReactDOM.render(
  <Provider
    store={createStore(() => ({
      token: "This is a random auth token"
    }))}
  >
    <Main />
  </Provider>,
  document.getElementById("root")
);
