import React from "react";
import { MoonLoader } from "react-spinners";

/**
 *
 * @author Giovanni Leo
 */
const CustomSpinner = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="w-full flex justify-center items-center py-4 fixed top-20 left-0 right-0 z-50">
        <MoonLoader size={30} color={"#000000"} loading={isLoading} />
      </div>
    )
  );
};

export default CustomSpinner;
