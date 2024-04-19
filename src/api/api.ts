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
    return instance.post<ResultResponse<{ item: TodolistsResponse }>>(
      `todo-lists`,
      {
        title,
      },
    );
  },
  deleteTodolist(id: string) {
    return instance.delete<ResultResponse>(`todo-lists/${id}`);
  },
  changeTitleTodolist(id: string, title: string) {
    return instance.put<ResultResponse>(`todo-lists/${id}`, { title });
  },
  getTasks(id: string) {
    return instance.get<TaskResponse>(`todo-lists/${id}/tasks`);
  },
  addTask(tId: string, title: string) {
    return instance.post<ResultResponse<{ item: TaskItemResponse }>>(
      `todo-lists/${tId}/tasks`,
      {
        title,
      },
    );
  },
  changeTask(tId: string, id: string, model: ModelChangeType) {
    return instance.put<ResultResponse<{ item: TaskItemResponse }>>(
      `todo-lists/${tId}/tasks/${id}`,
      model,
    );
  },
  deleteTask(tId: string, id: string) {
    return instance.delete<ResultResponse>(`todo-lists/${tId}/tasks/${id}`);
  },
};

export const authApi = {
  logIn(userData: useDataRequestType) {
    return instance.post<ResultResponse<{ userId: number }>>(
      "auth/login",
      userData,
    );
  },
  logout() {
    return instance.delete<ResultResponse>("auth/login");
  },
  captcha() {
    return instance.get<{ url: string }>("security/get-captcha-url");
  },
  authMe() {
    return instance.get<ResultResponse<AutMeResponse>>("auth/me");
  },
};

export enum TasksStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TodoTaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type AutMeResponse = {
  id: string;
  email: string;
  login: string;
};
export type AddTodoType = {
  statusTodo: StatusType;
};
export type useDataRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
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

export type TodolistsResponse = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type TaskResponse = {
  items: TaskItemResponse[];
  totalCount: number;
  error: null | string;
};
export type ResultResponse<T = {}> = {
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
