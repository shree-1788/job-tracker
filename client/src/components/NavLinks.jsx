/* eslint-disable no-unused-vars */
import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavLinks = (isBigSidebar) => {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, icon, path } = link;
        const { role } = user;
        if (role !== "admin" && path === "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
