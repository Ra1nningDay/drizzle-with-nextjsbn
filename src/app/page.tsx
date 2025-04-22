"use client";

import { Todo } from "@/types";
import { useTodo } from "@/hooks/useTodo";
import { useDarkModeStore } from "@/store/storeDarkMode";
import { useEffect } from "react";

export default function Home() {
    const { mode, toggleMode } = useDarkModeStore();
    const {
        todos,
        isLoading,
        error,
        newTodo,
        setNewTodo,
        handleAddTodo,
        handleDeleteTodo,
        mutationError,
    } = useTodo();

    useEffect(() => {
        if (mode === "darkMode") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [mode]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching todos: {error.message}</div>;
    }
    return (
        <div className="min-h-screen p-4">
            <button onClick={toggleMode} className="cursor-pointer border-1">
                {mode === "darkMode" ? "Light Mode" : "Dark Mode"}
            </button>
            <h1>Todo List</h1>

            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add New Todo"
            />
            <button onClick={handleAddTodo} className="cursor-pointer">
                Add Todo
            </button>
            {mutationError && <div>Error adding todo: {mutationError}</div>}

            <ul>
                {todos?.map((todo: Todo) => (
                    <li key={todo.id}>
                        {todo.name}
                        <button
                            className="ms-4 cursor-pointer"
                            onClick={() => handleDeleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
