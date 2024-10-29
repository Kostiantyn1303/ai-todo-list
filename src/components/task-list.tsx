import { Task } from "@/types/common";

export type TaskListProps = {
  tasks: Task[];
  onComplete: (index: number) => void;
  onRemove: (index: number) => void;
};

export const TaskList = ({ tasks, onComplete, onRemove }: TaskListProps) => {
  // Filtering tasks into active and completed based on the completed property
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Active tasks</h2>
      <ul className="flex flex-col gap-3">
        {activeTasks.map(
          (
            task,
            index // Mapping through active tasks
          ) => (
            <li
              key={index}
              className="flex justify-between items-center bg-[#1E1727] px-3 py-2 rounded-xl"
            >
              <div className="flex items-center">
                <span>{task.text}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => onComplete(tasks.indexOf(task))} // Calling onComplete with task index
                  className="bg-[#9E78CF] text-white rounded p-1 mr-3 flex items-center transition duration-200 ease-in-out transform hover:bg-[#7F5DA2] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9E78CF] focus:ring-opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                  >
                    <path
                      d="M19.7851 6.67391L8.7851 17.6739C8.72125 17.7378 8.64542 17.7885 8.56196 17.8231C8.4785 17.8577 8.38904 17.8755 8.29869 17.8755C8.20834 17.8755 8.11888 17.8577 8.03542 17.8231C7.95196 17.7885 7.87614 17.7378 7.81229 17.6739L2.99979 12.8614C2.87078 12.7324 2.79831 12.5574 2.79831 12.375C2.79831 12.1926 2.87078 12.0176 2.99979 11.8886C3.12879 11.7596 3.30375 11.6871 3.48619 11.6871C3.66863 11.6871 3.84359 11.7596 3.9726 11.8886L8.29869 16.2155L18.8123 5.70109C18.9413 5.57209 19.1163 5.49962 19.2987 5.49962C19.4811 5.49962 19.6561 5.57209 19.7851 5.70109C19.9141 5.8301 19.9866 6.00506 19.9866 6.1875C19.9866 6.36994 19.9141 6.5449 19.7851 6.67391Z"
                      fill="#FFF"
                    />
                  </svg>
                </button>

                {/* Button to remove the task */}
                <button
                  onClick={() => onRemove(tasks.indexOf(task))}
                  className="ml-2 bg-red-500 text-white rounded p-1"
                >
                  remove
                </button>
              </div>
            </li>
          )
        )}
      </ul>

      {completedTasks.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-4 mb-2">Completed tasks</h2>
          <ul className="flex flex-col gap-3">
            {completedTasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#1E1727] px-3 py-2 rounded-xl"
              >
                <div className="flex items-center">
                  <span className="line-through text-[#9E78CF]">
                    {task.text}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => onRemove(tasks.indexOf(task))} // Calling onRemove with task index
                    className="ml-2 bg-red-500 text-white rounded p-1"
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
