import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const postLinks = [
  {
    path: "/",
    text: "Posts",
  },
  {
    path: "albums",
    text: "Albums",
  },
  {
    path: "events",
    text: "Events",
  },

  {
    path: "jobs",
    text: "Jobs",
  },
];

/**
 *
 *
 * @author Giovanni Leo
 */
const HomeLayout = () => {
  return (
    <div className="max-container flex flex-col md:flex-row justify-between gap-5 w-full p-2">
      {/* <div className="hidden md:flex w-[200px] xl:w-[300px] bg-white fixed left-0 top-[100px] bottom-0">Left</div> */}

      <div className="flex flex-col w-full max-w-[600px] md:pl-[150px]  xl:pl-0 mx-auto">
        <div className="flex gap-5">
          {postLinks.map((post, index) => (
            <NavLink
              end
              style={({ isActive }) => (isActive ? { color: "grey", fontWeight: "bold", textDecoration: "underline" } : null)}
              key={index}
              className="mb-3"
              to={post.path}
            >
              {post.text}
            </NavLink>
          ))}
        </div>
        <Outlet />
        <h1 className="text-center font-bold text-light_text flex justify-center gap-2">
          <p>You have reached the end.</p>
          <button onClick={() => window.location.reload()} className="underline">
            Refresh
          </button>
        </h1>
      </div>

      {/* <div className="hidden xl:flex w-[300px] bg-red-200 fixed right-0 top-[100px] bottom-0">Right</div> */}
    </div>
  );
};

export default HomeLayout;
