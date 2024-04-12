import axios from "axios";
import { ModelChangeType } from "../store/tasks-reducer";
import { StatusType } from "../store/app-reducer";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
});

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistsResponse[]>(`todo-lists`);
  },
  addTodolist(title: string) {
    return instance.post<TodolistTaskResultResponse<{ item: TodolistsResponse }>>(`todo-lists`, {
      title,
    });
  },
  deleteTodolist(id: string) {
    return instance.delete<TodolistTaskResultResponse>(`todo-lists/${id}`);
  },
  changeTitleTodolist(id: string, title: string) {
    return instance.put<TodolistTaskResultResponse>(`todo-lists/${id}`, { title });
  },
  getTasks(id: string) {
    return instance.get<TaskResponse>(`todo-lists/${id}/tasks`);
  },
  addTask(tId: string, title: string) {
    return instance.post<TodolistTaskResultResponse<{ item: TaskItemResponse }>>(
      `todo-lists/${tId}/tasks`,
      { title }
    );
  },
  changeTask(tId: string, id: string, model: ModelChangeType) {
    return instance.put<TodolistTaskResultResponse<{ item: TaskItemResponse }>>(
      `todo-lists/${tId}/tasks/${id}`,
      model
    );
  },
  deleteTask(tId: string, id: string) {
    return instance.delete<TodolistTaskResultResponse>(`todo-lists/${tId}/tasks/${id}`);
  },
};

export enum TasksStatuses {
  New = 0,
  InProgress = 1,
  Complited = 2,
  Draft = 3,
}
export enum TodoTaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TodolistsResponse = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type AddTodoType = {
  statusTodo: StatusType;
};
export type ChangeTodolistsResponse = TodolistsResponse & AddTodoType;
export type AddItemTaskType = { statusLoad: StatusType };
export type ChangeTaskResponseType = TaskItemResponse & AddItemTaskType;
export type TaskObjType = {
  [key: string]: ChangeTaskResponseType[];
};
export type TaskItemResponse = {
  id: string;
  title: string;
  description: null;
  todoListId: string;
  order: number;
  status: TasksStatuses;
  priority: TodoTaskPriority;
  startDate: string;
  deadline: string;
  addedDate: string;
};
export type TaskResponse = {
  items: TaskItemResponse[];
  totalCount: number;
  error: null | string;
};
export type TodolistTaskResultResponse<T = {}> = {
  data: T;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
