import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import event from "../../../assets/event.png";
import line from "../../../assets/line@.png";
import news_feed from "../../../assets/news feed.png";
import { useAuthContext } from "../../context/AuthContext";

const ProfileNavbar = () => {
  const { user } = useAuthContext();
  const [routes, setRoutes] = useState([
    {
      text: "POSTS",
      icon: news_feed,
      to: ".",
    },
    {
      text: "AEILINES",
      icon: line,
      to: "line",
    },
    {
      text: "JOINED EVENTS",
      icon: event,
      to: "interested_events",
    },
  ]);

  useEffect(() => {
    if (user.role === "Admin" || user.role === "Manager") {
      setRoutes([...routes, { text: "EVENTS", icon: event, to: "events" }]);
    }
  }, [user.role]);

  return (
    <div className="flex max-w-[900px] flex-wrap gap-3 mx-auto justify-between mt-20">
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
