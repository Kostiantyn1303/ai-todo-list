"use client";

import { useState, useCallback } from "react";
import { InputField, AddTaskButton, Loader } from "@/components/ui";
import { TaskList } from "@/components/task-list";
import { useTasks } from "@/hooks/task";
import { useSuggestions } from "@/hooks/suggestions";
import { SuggestionsList } from "@/components/suggestions-list";
import debounce from "lodash.debounce";

export const ToDoList = () => {
  const [taskInput, setTaskInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    tasks,
    addTask,
    completeTask,
    removeTask,
    isLoading,
    isError,
    error,
  } = useTasks();

  const {
    suggestions,
    refetch,
    isLoading: suggestionsLoading,
    isError: suggestionsError,
  } = useSuggestions(taskInput);

  // Debounced function to fetch suggestions after the user stops typing
  const debouncedRefetch = useCallback(
    debounce((input: string) => {
      // if (input.length > 1) {
      refetch(); // Call refetch if input length is greater than 1
      // }
    }, 300),
    [refetch]
  );

  // Handle changes in the input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setTaskInput(value);
    debouncedRefetch(value);
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (taskInput.trim()) {
      const taskExists = tasks.some(
        (task) => task.text.toLowerCase() === taskInput.trim().toLowerCase()
      );

      if (taskExists) {
        setErrorMessage("This task already exists!"); // Set error message if task exists
      } else {
        addTask.mutate({ text: taskInput.trim(), completed: false });
        setTaskInput("");
        setErrorMessage(null);
      }
    }
  };

  // Handle completing a task
  const handleCompleteTask = (index: number) => completeTask.mutate(index);

  const handleRemoveTask = (index: number) => removeTask.mutate(index);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Task List</h1>
      <div className="flex gap-2 justify-between align-middle">
        <InputField
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <AddTaskButton onAddTask={handleAddTask} text="Add" />
      </div>

      {suggestionsLoading ? (
        <Loader />
      ) : (
        <>
          {suggestionsError && (
            <p className="text-red-500">{suggestionsError}</p>
          )}

          <SuggestionsList
            suggestions={suggestions}
            onSelectSuggestion={(suggestion) => setTaskInput(suggestion)}
          />
        </>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError && <p className="text-red-500">{error?.message}</p>}

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          <TaskList
            tasks={tasks}
            onComplete={handleCompleteTask}
            onRemove={handleRemoveTask}
          />
        </>
      )}
    </div>
  );
};
