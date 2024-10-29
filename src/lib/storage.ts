import { Task } from "../types/common";
export const loadTasks = (): Task[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }
  return [];
};

export const saveTasks = (tasks: Task[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};
