import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    fetchTodoList,
    sendTodo,
    deleteTodo,
    updateTodo,
} from "@/lib/apiTodos";
import { Todo } from "@/types";
import { toast } from "react-toastify";

export const useTodo = () => {
    // State for input and error
    const [newTodo, setNewTodo] = useState<string>("");
    const [mutationError, setMutationError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

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
        select: (data: Todo[]) => {
            // Sort todos based on sortOrder
            return [...data].sort((a, b) => {
                return sortOrder === "latest" ? b.id - a.id : a.id - b.id;
            });
        },
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

    const updateMutation = useMutation({
        mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
            updateTodo(id, completed),
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
        toast.success("Add a task successfully!!");
        setNewTodo("");
    };

    const completedTask = (id: number, completed: boolean) => {
        updateMutation.mutate({ id, completed });
    };

    // Handler for deleting a todo
    const handleDeleteTodo = (id: number) => {
        deleteMutation.mutate(id);
        toast.error("Delete a task successfully!");
    };

    const toggleTask = (id: number) => {
        const updatedTodos = todos?.map((todo: Todo) =>
            todo.id === id ? { ...todo, isToggle: !todo.isToggle } : todo
        );
        queryClient.setQueryData(["todos"], updatedTodos);
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
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
        completedTask,
        toggleTask,
        sortOrder,
        toggleSortOrder,
    };
};
