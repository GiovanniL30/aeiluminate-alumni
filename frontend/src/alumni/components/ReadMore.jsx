import { useState } from "react";

export const ReadMore = ({ id, text, charLimit = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const itCanOverflow = text.length > charLimit;
  const truncatedText = itCanOverflow ? text.slice(0, charLimit) : text;

  const handleKeyboard = (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <p id={id} className="whitespace-normal break-words">
      {isExpanded ? text : truncatedText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span
            className="text-primary_blue ml-2 cursor-pointer text-sm"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "show less" : "show more"}
          </span>
        </>
      )}
    </p>
  );
};
