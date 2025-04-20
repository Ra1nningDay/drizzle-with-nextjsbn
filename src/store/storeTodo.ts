import { create } from "zustand";

interface Todo {
  id: number;
  title: string;
}

const useTodoStore = create<{
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (index: number) => void;
}>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (index) =>
    set((state) => {
      const newTodos = [...state.todos];
      newTodos.splice(index, 1);
      return { todos: newTodos };
    }),
}));

export default useTodoStore;
