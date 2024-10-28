type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};
export const InputField = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="text-black border border-[#9E78CF] rounded-lg p-2 w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#9E78CF] focus:border-transparent"
      placeholder={placeholder}
    />
  );
};
