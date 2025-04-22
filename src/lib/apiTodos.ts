import axios from "axios";
import { Todo } from "@/types";

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: { "Content-Type": "application/json" },
});

export const fetchTodoList = async () => {
    const res = await api.get("/todos");
    return res.data;
};

export const sendTodo = async (newTodo: Todo) => {
    const res = await api.post("/todos", newTodo);
    return res.data;
};

export const deleteTodo = async (id: number) => {
    const res = await api.delete(`/todos/${id}`);
    return res.data;
};
