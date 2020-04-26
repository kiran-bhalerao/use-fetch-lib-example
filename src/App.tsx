import React from "react";
import { useSelector } from "react-redux";
import { UseFetchProvider } from "use-fetch-lib";
import { Another } from "./Another";

export const App = () => {
  return (
    <UseFetchProvider
      baseUrl="https://jsonplaceholder.typicode.com"
      authorizationToken={useSelector((store: any) => store.token)}
    >
      <Another />
    </UseFetchProvider>
  );
};
