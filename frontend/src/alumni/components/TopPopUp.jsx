import React, { useState } from "react";

/**
 *
 * @author Giovanni Leo
 */
const TopPopUp = ({ text }) => {
  const [hide, setHide] = useState(false);

  return (
    <>
      {!hide && (
        <div className="fixed top-5 left-10 right-10 shadow-md  flex justify-between items-center bg-red-600 rounded-md text-white py-2 px-4 z-50">
          <h1 className=" text-center flex-1">{text}</h1>
          <button className="flex items-center justify-center border-[1px] rounded-full w-5 h-5" onClick={() => setHide(true)}>
            <p className="text-sm">X</p>
          </button>
        </div>
      )}
    </>
  );
};

export default TopPopUp;
