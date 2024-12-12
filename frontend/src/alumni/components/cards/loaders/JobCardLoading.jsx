import React from "react";

/**
 * Card Loading
 *
 * @author Giovanni Leo
 */
const JobCardLoading = () => {
  return (
    <div className="my-shadow rounded-md p-3 animate-pulse">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
      </div>

      <div className="flex flex-col p-5 mt-1">
        <div className="flex flex-col">
          <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2 p-2">
          <div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="pl-2 mt-2 space-y-2">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default JobCardLoading;
