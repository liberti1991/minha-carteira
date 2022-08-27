import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";

import { Dashboard } from "../pages/Dashboard";
import { List } from "../pages/List";

export const MyRoutes = () => (
  <Layout>
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/list/:type" element={<List />} />
    </Routes>
  </Layout>
);
