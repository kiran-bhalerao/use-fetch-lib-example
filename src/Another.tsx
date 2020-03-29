import React, { useEffect } from "react";
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

export const Another: React.FC = () => {
  const [todo, { isFulfilled: todoFulfilled }, recall] = useFetch<IGetTodos>({
    url: "/todos/1",
    method: "get",
    shouldDispatch: true,
    cancelable: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      recall();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [recall]);

  return (
    <>
      <br />
      <h3>useFetch `get` call</h3>
      <div>
        <span style={{ fontWeight: "bold" }}>Data: </span>{" "}
        {todo?.title && todo?.title}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>State: </span>
        {todoFulfilled ? "Todos loaded.. 💯" : "Loading Todos... 🏃"}
      </div>
      <br />
    </>
  );
};
