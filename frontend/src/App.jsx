import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Dashboard,
  Layout,
  Applications,
  Accounts,
  AdminAuth,
} from "./admin/pages";

const App = () => {
  return (
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
