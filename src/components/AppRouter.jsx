import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/context";
import { Lists } from "./List/Lists";
import { privateRoute, publicRoute } from "./router";

export const AppRouter = () => {
  const { isAuth, load } = React.useContext(AuthContext);

  if (load) {
    return <Lists />;
  }
  return isAuth ? (
    <Routes>
      {privateRoute.map((route) => (
        <Route key={route.path} element={route.element} path={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/posts/1" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoute.map((route) => (
        <Route key={route.path} element={route.element} path={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
