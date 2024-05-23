import { TasksStatuses, TodoTaskPriority } from "../../enum/enumApi";
import { StatusType } from "../typesApp/typesApp";

export type AddItemTaskType = { statusLoad: StatusType };
export type TaskObjType = {
  [key: string]: ChangeTaskResponseType[];
};
export type ChangeTaskResponseType = TaskItemResponse & AddItemTaskType;

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
export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
