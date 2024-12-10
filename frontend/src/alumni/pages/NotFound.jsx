import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white padding flex items-center">
      <div className="max-container">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-9xl text-center">404</h1>
          <p className="font-bold text-xl mt-20">Are you lost ?</p>
          <p>Unfortunately, we can’t illuminate outer space. Try refreshing the page or going back to the homepage.</p>

          <NavLink to="/home">
            <div className="flex gap-10 justify-center mt-20 font-bold text-2xl hover-opacity items-center">
              <p className="text-4xl">&larr;</p>
              <p>Home</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
