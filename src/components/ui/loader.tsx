export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full mt-3">
      <svg
        className="animate-spin h-10 w-10 text-[#9E78CF]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0 1 8-8v2a6 6 0 0 0 0 12v2a8 8 0 0 1-8-8z"
        />
      </svg>
    </div>
  );
};
