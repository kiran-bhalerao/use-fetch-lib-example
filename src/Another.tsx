/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useFetch } from "use-fetch-lib";

const mockTodos = {
  completed: false,
  id: 1,
  title: "mock title",
  userId: 1
};

type IPostTodo = {
  title: string;
  body: string;
  userId: number;
};

type IGetTodos = typeof mockTodos;

interface IPostData extends IPostTodo {
  id: number;
}

const SubComponent: React.FC<any> = ({ name }) => {
  const [todo, { isFulfilled, isMocked, isCached }, recall] = useFetch<
    IGetTodos
  >({
    url: "/todos/1",
    method: "get",
    mockData: {
      id: 2,
      title: "Mock title",
      userId: 223,
      completed: false
    },
    beforeServiceCall: () => {
      console.log(`Called ${name}`);
    },
    cache: true
  });

  useEffect(() => {
    console.log(name, isFulfilled, isMocked, isCached);
  }, [isFulfilled, isMocked, isCached]);

  const [clicks, updateClicks] = useState(1);

  return (
    <>
      <div>
        <span style={{ fontWeight: "bold" }}>Hits: </span>({clicks})
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Data: </span>{" "}
        {todo?.title && todo?.title}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>status: </span>
        {isFulfilled ? "Todos loaded.. 💯" : "Loading Todos... 🏃"}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>from: </span>
        {isMocked
          ? "Mock"
          : isCached
          ? "Cache"
          : isFulfilled
          ? "Network"
          : "Pending"}
      </div>
      <br />
      <button
        onClick={() => {
          updateClicks(pre => pre + 1);
          recall();
        }}
      >
        Hit <span role="img">✋</span>
      </button>
    </>
  );
};

export const Another: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div>
        <h1>Component</h1>
        <SubComponent name="Component" />
      </div>
      <div>
        <h1>Another Component</h1>
        <SubComponent name="Another Component" />
      </div>
    </div>
  );
};
