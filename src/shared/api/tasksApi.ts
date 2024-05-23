import { ModelChangeType } from "shared/model/tasks-reducer";
import { instance } from "./api";
import { ResultResponse, TaskItemResponse, TaskResponse } from "shared";

export const tasksApi = {
  getTasks(id: string) {
    return instance.get<TaskResponse>(`todo-lists/${id}/tasks`);
  },
  addTask(tId: string, title: string) {
    return instance.post<ResultResponse<{ item: TaskItemResponse }>>(`todo-lists/${tId}/tasks`, {
      title,
    });
  },
  changeTask(tId: string, id: string, model: ModelChangeType) {
    return instance.put<ResultResponse<{ item: TaskItemResponse }>>(`todo-lists/${tId}/tasks/${id}`, model);
  },
  deleteTask(tId: string, id: string) {
    return instance.delete<ResultResponse>(`todo-lists/${tId}/tasks/${id}`);
  },
};
