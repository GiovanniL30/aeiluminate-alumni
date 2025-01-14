import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  BrowsePosts,
  ChatMessage,
  InboxLayout,
  MainLayout,
  CreatePost,
  Signin,
  Signup,
  UserPosts,
  UserEvents,
  UserFollowers,
  UsersFollowing,
  UserLayout,
  UserAeilines,
  UserEditProfile,
  NotFound,
  NoOpenedMessage,
  AlbumContribute,
  Album,
  BrowseUsers,
  BrowseAlbums,
  BrowseEvents,
  BrowseJobs,
  HomeLayout,
  ForgetPassword,
  UserInteresetedEvents,
} from "./alumni/pages/index.js";
import Auth from "./alumni/_auth/Auth.jsx";
import AuthContext from "./alumni/context/AuthContext.jsx";
import PrivateProtected from "./alumni/pages/user/PrivateProtected.jsx";

/**
 *
 *
 * @author Giovanni Leo
 */
const App = () => {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route element={<Auth />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<BrowsePosts />} />
                <Route path="events" element={<BrowseEvents />} />
                <Route path="albums" element={<BrowseAlbums />} />
                <Route path="jobs" element={<BrowseJobs />} />
              </Route>
              <Route path="users" element={<BrowseUsers />} />
              <Route path="post" element={<CreatePost />} />
              <Route path="inbox" element={<InboxLayout />}>
                <Route index element={<NoOpenedMessage />} />
                <Route path=":receiverId" element={<ChatMessage />} />
              </Route>
              <Route path="album/contribute/:albumId" element={<AlbumContribute />} />
              <Route path="album/:albumId" element={<Album />} />
              <Route path="user/:id" element={<UserLayout />}>
                <Route element={<PrivateProtected />}>
                  <Route index element={<UserPosts />} />
                  <Route path="events" element={<UserEvents />} />
                  <Route path="line" element={<UserAeilines />} />
                  <Route path="interested_events" element={<UserInteresetedEvents />} />
                </Route>
                <Route path="followers" element={<UserFollowers />} />
                <Route path="following" element={<UsersFollowing />} />
                <Route path="edit" element={<UserEditProfile />} />
              </Route>
            </Route>
          </Route>

          <Route path="login" element={<Signin />} />
          <Route path="register" element={<Signup />} />
          <Route path="recover" element={<ForgetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
};

export default App;
