/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { SFC, useEffect, useState } from "react";
import { useFetch } from "use-fetch-lib";

const mockTodos = {
  completed: false,
  id: 1,
  title: "mock title",
  userId: 1,
};

type IPostTodo = {
  title: string;
  userId: number;
  completed: boolean;
};

type IGetTodos = typeof mockTodos;

const AddTodosComponent: SFC<{ updateTodos: (todo: IGetTodos) => void }> = ({
  updateTodos,
}) => {
  const [title, setTitle] = useState("");

  const [
    {
      data: todo,
      status: { isPending },
    },
    postTodo,
  ] = useFetch<IGetTodos, IPostTodo>({
    url: "/todos",
    method: "post",
    cache: true,
  });

  const submit = () => {
    postTodo({
      userId: 1,
      completed: true,
      title,
    });
  };

  useEffect(() => {
    if (todo) {
      updateTodos(todo);
    }
  }, [todo]);

  return (
    <div>
      <input
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={submit} disabled={isPending}>
        {isPending ? "wait" : "submit"}
      </button>
    </div>
  );
};

export const Another: React.FC = () => {
  const [
    {
      data: todos,
      status: { isFulfilled, isCached, isPending },
    },
    recall,
    mutateTodos,
  ] = useFetch<IGetTodos[]>({
    url: "/todos?_limit=4",
    method: "get",
    cache: true,
  });

  const [clicks, updateClicks] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        height: "60vh",
        marginTop: "20vh",
      }}
    >
      <div>
        <h2>1️⃣ Get Todos Component</h2>
        <div>
          <span style={{ fontWeight: "bold" }}>Hits: </span>
          {clicks}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>status: </span>
          {isFulfilled
            ? "Todos loaded.. 💯"
            : isPending
            ? "Loading Todos... 🏃"
            : "NA"}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>from: </span>
          {isCached ? "Cache" : isFulfilled ? "Network" : "NA"}
        </div>
        <br />
        <button
          onClick={() => {
            updateClicks((pre) => pre + 1);
            recall();
          }}
        >
          Hit <span role="img">✋</span>
        </button>
        <br />
        <br />
        <div>
          <span style={{ fontWeight: "bold" }}>Data: </span>{" "}
          <ul>
            {todos?.map((todo) => (
              <li key={todo.id}>{todo?.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>2️⃣ Add Todos Component</h2>
        <AddTodosComponent
          updateTodos={(todo) => mutateTodos?.((pre) => [...pre, todo])}
        />
      </div>
    </div>
  );
};
