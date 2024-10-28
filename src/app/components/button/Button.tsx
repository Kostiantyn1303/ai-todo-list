type ButtonProps = {
  onAddTask: () => void;
  text: string;
  className?: string;
};
export const AddTaskButton = ({ onAddTask, text, className }: ButtonProps) => (
  <button
    onClick={onAddTask}
    className={`bg-[#9E78CF] text-white rounded p-2 h-full transition duration-200 ease-in-out 
      hover:bg-[#7F5DA2] focus:outline-none focus:ring-2 focus:ring-[#9E78CF] focus:ring-opacity-50 
      ${className}`}
  >
    {text}
  </button>
);
