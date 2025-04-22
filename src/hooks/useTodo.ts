import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTodoList, sendTodo, deleteTodo } from "@/lib/apiTodos";
import { Todo } from "@/types";

export const useTodo = () => {
    // State for input and error
    const [newTodo, setNewTodo] = useState<string>("");
    const [mutationError, setMutationError] = useState<string | null>(null);

    // QueryClient for invalidating queries
    const queryClient = useQueryClient();

    // Query for fetching todos
    const {
        data: todos,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodoList,
    });

    // Mutation for adding a todo
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

    // Mutation for deleting a todo
    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    // Handler for adding a todo
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

    // Handler for deleting a todo
    const handleDeleteTodo = (id: number) => {
        deleteMutation.mutate(id);
    };

    // Return everything needed for the UI
    return {
        todos,
        isLoading,
        error,
        newTodo,
        setNewTodo,
        mutationError,
        handleAddTodo,
        handleDeleteTodo,
    };
};
