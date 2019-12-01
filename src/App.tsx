import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetch, UseFetchProvider } from "use-fetch-lib";
import { Another } from "./Another";

export const App = () => {
  const [data] = useFetch({
    url: "/api/v1/employee/1",
    method: "get",
    shouldDispatch: true
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);
    }
  }, [data]);

  return (
    <UseFetchProvider
      baseUrl="https://jsonplaceholder.typicode.com"
      authorizationToken={useSelector((store: any) => store.token)}
    >
      <Another />
    </UseFetchProvider>
  );
};
