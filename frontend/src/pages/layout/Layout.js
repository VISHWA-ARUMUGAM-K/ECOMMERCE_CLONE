import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import Header from "../../components/home/header/Header";
import { DataProvider } from "../../data/dataContext";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";

const Layout = () => {
  const token = useSelector(selectCurrentToken);
  return (
    <div className="App">
      {token ? (
        <DataProvider>
          <Header />
          <Outlet />
        </DataProvider>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </div>
  );
};

export default Layout;
