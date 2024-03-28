import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import Header from "../../components/home/header/Header";
import { DataProvider } from "../../data/dataContext";

const Layout = () => {
  const token = localStorage.getItem("ecomm_token");

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
