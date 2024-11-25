import React from "react";

const PostCommentLoading = () => {
  return (
    <div className="py-20 px-10 fixed left-0 right-0 top-0 bottom-0 min-h-screen bg-black bg-opacity-30 z-50 pointer-events-auto">
      <button className="fixed right-4 top-12 text-white font-bold text-xl">&#10005;</button>
      <div className="w-full h-full bg-white rounded-md flex flex-col lg:flex-row animate-pulse">
        <div className="w-full lg:w-1/2 h-full max-h-[300px] lg:max-h-full bg-slate-100"></div>

        <div className="px-4 w-full lg:w-1/2 h-full p-5 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
              <div className="flex flex-col gap-1">
                <div className="w-32 h-4 bg-slate-100 rounded-md"></div>
                <div className="w-20 h-3 bg-slate-100 rounded-md"></div>
              </div>
              <div className="ml-10 w-20 h-8 bg-slate-100 rounded-md"></div>
            </div>

            <div className="mt-8">
              <div className="w-full h-4 bg-slate-100 rounded-md mb-2"></div>
              <div className="w-3/4 h-4 bg-slate-100 rounded-md"></div>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center min-h-[100px]">
            <div className="italic text-gray-400">Loading comments...</div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-slate-100 rounded-full"></div>
              <div className="w-16 h-4 bg-slate-100 rounded-md"></div>
            </div>
            <div className="h-16 w-full bg-slate-100 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCommentLoading;
