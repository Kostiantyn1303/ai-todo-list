type SuggestionsListProps = {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
};

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  onSelectSuggestion,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-5 ">
      <p className="text-center mb-2">Select task below</p>
      <ul className="border border-[#9E78CF] rounded p-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="cursor-pointer"
            onClick={() => onSelectSuggestion(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};
