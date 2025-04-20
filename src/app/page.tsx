"use client";

import { useTodo } from "@/hooks/useTodoHook";

export default function Home() {
  const { todos, newTodo, setNewTodo, handleAddTodo, removeTodo } = useTodo();
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
        {todos.map((todo, index) => (
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
