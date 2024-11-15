import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard, Layout, Applications, Accounts, AdminAuth } from "./admin/pages";

import {
  Home,
  Inbox,
  MainLayout,
  Notifications,
  Post,
  Profile,
  Search,
  Signin,
  Signup,
  User,
  UserEvents,
  UserFollowers,
  UsersFollowing,
  UserLayout,
} from "./alumni/pages/index.js";
import AlumniAuth from "./alumni/_auth/AlumniAuth.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AlumniAuth />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="post" element={<Post />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />

            <Route path="user" element={<UserLayout />}>
              <Route index element={<User />} />
              <Route path="events" element={<UserEvents />} />
              <Route path="followers" element={<UserFollowers />} />
              <Route path="following" element={<UsersFollowing />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
