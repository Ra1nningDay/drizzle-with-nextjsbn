"use client";

import { fetchTodoList } from "@/lib/apiTodos";
import useTodoStore from "@/store/storeTodo";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, error } = useQuery(["todos"], fetchTodoList);
  const { newTodo, setNewTodo } = useTodoStore();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add New Todo"
      ></input>
      <button onClick={handleAddTodo} className="cursor-pointer">
        Click
      </button>

      <ul>
        {data.map((todo, index) => (
          <li key={index}>
            {todo.id}.{todo.title}
            <button
              className="ms-4 cursor-pointer"
              onClick={() => removeTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
