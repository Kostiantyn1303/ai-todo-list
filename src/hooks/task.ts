import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types/common";
import { loadTasks, saveTasks } from "@/lib/storage";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: loadTasks,
  });

  const addTask = useMutation({
    mutationFn: async (newTask: Task) => {
      const updatedTasks = [...tasks, newTask];
      saveTasks(updatedTasks);
      return updatedTasks;
    },
    onSuccess: (updatedTasks) => {
      queryClient.setQueryData(["tasks"], updatedTasks);
    },
  });

  const completeTask = useMutation({
    mutationFn: async (index: number) => {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    },
    onSuccess: (updatedTasks) => {
      queryClient.setQueryData(["tasks"], updatedTasks);
    },
  });

  const removeTask = useMutation({
    mutationFn: async (index: number) => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      saveTasks(updatedTasks);
      return updatedTasks;
    },
    onSuccess: (updatedTasks) => {
      queryClient.setQueryData(["tasks"], updatedTasks);
    },
  });

  return {
    tasks,
    addTask,
    completeTask,
    removeTask,
    isLoading,
    isError,
    error,
  };
};
