import React from "react";

/**
 * Card Loading
 *
 * @author Giovanni Leo
 */
const AelineCardLoading = () => {
  return (
    <div className="flex gap-7 w-full bg-slate-200 animate-pulse">
      <div className="flex items-start justify-start">
        <div className="w-14 h-14 bg-slate-100 rounded-full animate-pulse"></div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="w-32 h-4 bg-slate-100 rounded animate-pulse mb-2"></div>
        <div className="w-48 h-4 bg-slate-100 rounded animate-pulse mb-2"></div>

        <div className="flex mt-4 gap-2 items-center">
          <div className="w-5 h-5 bg-slate-100 rounded animate-pulse"></div>
          <div className="w-5 h-5 bg-slate-100 rounded animate-pulse"></div>
        </div>

        <div className="w-24 h-4 bg-slate-100 rounded animate-pulse mt-2"></div>
      </div>

      <div className="flex items-start justify-center gap-2 ml-auto mt-2">
        <div className="flex gap-2">
          <div className="w-24 h-4 bg-slate-100 rounded animate-pulse"></div>

          <div className="w-5 h-5 bg-slate-100 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default AelineCardLoading;
