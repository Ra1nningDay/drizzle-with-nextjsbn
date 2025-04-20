"use client";

import { useState } from "react";
import useTodoStore from "@/store/storeTodo";

export const useTodo = () => {
  const { todos, addTodo, removeTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleAddTodo = () => {
    addTodo({ id: todos.length + 1, title: newTodo });
    setNewTodo("");
  };

  return {
    todos,
    addTodo,
    newTodo,
    setNewTodo,
    handleAddTodo,
    removeTodo,
  };
};
