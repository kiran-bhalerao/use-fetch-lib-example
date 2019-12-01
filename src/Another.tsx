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
  const [mock, { isMocked }] = useFetch({
    url: "/mocked/api",
    method: "get",
    shouldDispatch: true,
    mockData: mockTodos
  });

  const [todo, { isFulfilled: todoFulfilled }] = useFetch<IGetTodos>({
    url: "/todos/1",
    method: "get",
    shouldDispatch: true
  });

  const [, { isFulfilled }, postTodo] = useFetch<IPostData, IPostTodo>({
    url: "/posts",
    method: "post"
  });

  useEffect(() => {
    postTodo({
      title: "hello world",
      body: "test",
      userId: 23
    });
  }, []);

  return (
    <>
      <div>useFetch Mocking: {mock ? mock.title : "Mock title"}</div>
      <div>{isMocked ? "mocked data" : "Not a mock data"}</div>
      <br />
      <div>useFetch Get call: {todo ? todo.title : "waiting..."}</div>
      <div>{todoFulfilled ? "There are your todos" : "Loading todos..."}</div>
      <br />
      <div>{isFulfilled ? "Todo Posted ....." : "Todo Posting >>>>>>"}</div>
    </>
  );
};
