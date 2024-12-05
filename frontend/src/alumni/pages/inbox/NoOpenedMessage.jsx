import React from "react";

const NoOpenedMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gray-100 p-5">
      <div className="mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v5a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-600">No Message Selected</h2>
      <p className="text-sm text-gray-500 mt-2">Please select a message from the list to view its contents.</p>
    </div>
  );
};

export default NoOpenedMessage;
