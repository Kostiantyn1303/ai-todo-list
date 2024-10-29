import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useSuggestions = (taskInput: string) => {
  const fetchSuggestions = async (): Promise<string[]> => {
    const response = await fetch(
      `/api/suggestions?task=${encodeURIComponent(taskInput)}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Error fetching suggestions");
    }
    return data.suggestions || [];
  };

  const {
    data: suggestions = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["suggestions", taskInput],
    queryFn: fetchSuggestions,
    enabled: false,
    placeholderData: keepPreviousData,
  });

  return { suggestions, refetch, isLoading, isError, error };
};
