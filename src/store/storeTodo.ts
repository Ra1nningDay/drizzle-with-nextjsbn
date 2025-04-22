import { create } from "zustand";
import { Todo } from "@/types";

const useTodoStore = create<{
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
}>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
}));

export default useTodoStore;
