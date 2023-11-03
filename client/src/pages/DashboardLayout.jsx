/* eslint-disable no-unused-vars */
import React, { useState, createContext, useContext } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
const DashboardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch("/auth/logout");
    toast.success("Logged out successfully");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        logoutUser,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
