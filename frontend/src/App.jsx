import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  Inbox,
  MainLayout,
  Notifications,
  CreatePost,
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
import Auth from "./alumni/_auth/Auth.jsx";
import AuthContext from "./alumni/context/AuthContext.jsx";

const App = () => {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route element={<Auth />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="post" element={<CreatePost />} />
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

          <Route path="login" element={<Signin />} />
          <Route path="register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
};

export default App;
