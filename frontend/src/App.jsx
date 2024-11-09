import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedInProvider from "./admin/context/LoggedIn";
import {
  Dashboard,
  Layout,
  Applications,
  Accounts,
  AdminAuth,
  Login,
} from "./admin/pages";

const App = () => {
  return (
    <LoggedInProvider>
      <BrowserRouter>
        <Routes>
          {/** Admin Routes*/}
          <Route element={<AdminAuth />}>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="applications" element={<Applications />} />
            </Route>
          </Route>

          {/** Admin Login Route */}

          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LoggedInProvider>
  );
};

export default App;
