import React from "react";

/**
 * Card Loading
 *
 * @author Giovanni Leo
 */
const SimpleCardLoader = () => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="w-full h-[300px] bg-slate-50 animate-pulse rounded-md">
          <div className="w-full h-full bg-slate-50 animate-pulse rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default SimpleCardLoader;
