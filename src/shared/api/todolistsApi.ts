import { ResultResponse, TodolistsResponse } from "shared/types";
import { instance } from "./api";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistsResponse[]>(`todo-lists`);
  },
  addTodolist(title: string) {
    return instance.post<ResultResponse<{ item: TodolistsResponse }>>(`todo-lists`, {
      title,
    });
  },
  deleteTodolist(id: string) {
    return instance.delete<ResultResponse>(`todo-lists/${id}`);
  },
  changeTitleTodolist(id: string, title: string) {
    return instance.put<ResultResponse>(`todo-lists/${id}`, { title });
  },
};
