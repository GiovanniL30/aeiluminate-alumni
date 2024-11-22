import React from "react";
import { NavLink } from "react-router-dom";

import event from "../../assets/event.png";
import line from "../../assets/line@.png";
import news_feed from "../../assets/news feed.png";

const routes = [
  {
    text: "POSTS",
    icon: news_feed,
    to: ".",
    end: true,
  },
  {
    text: "AEILINES",
    icon: line,
    to: "line",
  },
  {
    text: "EVENTS",
    icon: event,
    to: "events",
  },
];

const ProfileNavbar = () => {
  return (
    <div className="flex max-w-[900px] mx-auto justify-between mt-20">
      {routes.map((route, index) => {
        return (
          <NavLink
            end
            key={index}
            to={route.to}
            className={({ isActive }) => (isActive ? "flex items-center text-primary_blue font-bold opacity-50" : "flex items-center")}
          >
            <img className="w-5" src={route.icon} alt="" />
            <p className="text-sm ml-1">{route.text}</p>
          </NavLink>
        );
      })}
    </div>
  );
};

export default ProfileNavbar;
