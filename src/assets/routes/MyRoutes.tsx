import { Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks/auth";

import { Layout } from "../components/layout/Layout";

import { Dashboard } from "../pages/Dashboard";
import { List } from "../pages/List";
import { SignIn } from "../pages/SignIn";

export const MyRoutes = () => {
  const { logged } = useAuth();
  
  return (
    <>
      {logged ? (
        <Layout>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/list/:type" element={<List />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      )}
    </>
  );
};
