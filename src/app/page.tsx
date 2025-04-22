"use client";

import type React from "react";

import type { Todo } from "@/types";
import { useTodo } from "@/hooks/useTodo";
import { useDarkModeStore } from "@/store/storeDarkMode";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun, Trash2, Plus, Loader2, SquarePen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
        completedTask,
        toggleTask,
    } = useTodo();

    useEffect(() => {
        if (mode === "darkMode") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAddTodo();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-lg">Loading your todos.. .</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Alert variant="destructive" className="max-w-md">
                    <AlertDescription>
                        Error fetching todos: {error.message}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-slate-950 bg-slate-50 dark:text-white  transition-colors duration-300 p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold ">My Todo List</h1>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleMode}
                        aria-label={
                            mode === "darkMode"
                                ? "Switch to Light Mode"
                                : "Switch to Dark Mode"
                        }
                        className="cursor-pointer"
                    >
                        {mode === "darkMode" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Add New Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <Input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="What needs to be done?"
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                className="cursor-pointer hover:bg-gray-100 dark:hover:text-black transition-all duration-300"
                                disabled={!newTodo.trim()}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                            </Button>
                        </form>
                        {mutationError && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertDescription>
                                    Error adding todo: {mutationError}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Tasks</CardTitle>
                            <Badge variant="outline">
                                {todos?.length || 0} items
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {todos?.length === 0 ? (
                            <p className="text-center py-6 text-muted-foreground">
                                No tasks yet. Add one above!
                            </p>
                        ) : (
                            <ul className="space-y-2">
                                {todos?.map((todo: Todo) => (
                                    <li key={todo.id}>
                                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                            <span
                                                className={`font-medium ${
                                                    todo.completed === false
                                                        ? ""
                                                        : "line-through"
                                                }`}
                                            >
                                                {todo.name}
                                            </span>
                                            <div className="flex ">
                                                {todo.isToggle ? (
                                                    <div className="">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                completedTask(
                                                                    todo.id,
                                                                    true
                                                                )
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            ✔
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                toggleTask(
                                                                    todo.id
                                                                )
                                                            }
                                                        >
                                                            ❌
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            toggleTask(todo.id)
                                                        }
                                                    >
                                                        <SquarePen />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handleDeleteTodo(
                                                            todo.id
                                                        )
                                                    }
                                                    aria-label={`Delete ${todo.name}`}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                        {todos.indexOf(todo) <
                                            todos.length - 1 && (
                                            <Separator className="my-2" />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
