"use client";

import { fetchTodoList, sendTodo, deleteTodo } from "@/lib/apiTodos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/types";
import { useState } from "react";

export default function Home() {
    const [newTodo, setNewTodo] = useState<string>("");
    const [mutationError, setMutationError] = useState<string | null>(null);

    const queryClient = useQueryClient();
    const {
        data: todos,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodoList,
    });

    const addMutation = useMutation({
        mutationFn: sendTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            setMutationError(null);
        },
        onError: (error: Error) => {
            setMutationError(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const handleAddTodo = () => {
        if (!newTodo.trim()) return;
        const newTodoItem: Todo = {
            id: Date.now(), // ควรเปลี่ยนเป็น UUID หรือให้ backend จัดการ
            name: newTodo,
            completed: false,
        };
        addMutation.mutate(newTodoItem);
        setNewTodo("");
    };

    const handleDeleteTodo = (id: number) => {
        deleteMutation.mutate(id);
    };

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
        </>
    );
}
