import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/todos",
  headers: { "Content-Type": "application/json" },
});

export const fetchTodoList = async () => {
  const res = await api.get("/todos");
  return res.data;
};

export const addTodo = async (newTodo: Todo) => {
  const res = await api.post("/todos", newTodo);
  return res.data;
};
