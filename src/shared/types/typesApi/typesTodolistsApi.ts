import { StatusType } from "shared/types";

export type AddTodoType = {
  statusTodo: StatusType;
};

export type ChangeTodolistsResponseType = TodolistsResponse & AddTodoType;

export type TodolistsResponse = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
