import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    const sidebar = document.getElementsByClassName("js-sidebar")[0];
    const sidebarToggle =
      document.getElementsByClassName("js-sidebar-toggle")[0];

    const handleSidebarToggle = () => {
      sidebar.classList.toggle("collapsed");
      sidebar.addEventListener("transitionend", () => {
        window.dispatchEvent(new Event("resize"));
      });
    };

    if (sidebar && sidebarToggle) {
      sidebarToggle.addEventListener("click", handleSidebarToggle);
    }

    return () => {
      if (sidebar && sidebarToggle) {
        sidebarToggle.removeEventListener("click", handleSidebarToggle);
      }
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav id="sidebar" className="sidebar js-sidebar ">
      <SimpleBar className="sidebar-content">
        <Link className="sidebar-brand" to={"/"}>
          <span className="align-middle">AdminKit</span>
        </Link>

        <ul className="sidebar-nav">
          <li className="sidebar-header">Dashboard</li>

          <li className={`sidebar-item ${isActive("/") ? "active" : ""}`}>
            <Link className="sidebar-link" to={"/"}>
              <i className="align-middle" data-feather="sliders"></i>
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              isActive("/manage_users") ||
              isActive("/create_user") ||
              location.pathname.startsWith("/update_user")
                ? "active"
                : ""
            }`}
          >
            <Link className="sidebar-link" to={"/manage_users"}>
              <i className="align-middle" data-feather="users"></i>
              <span className="align-middle">Manage Users</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              isActive("/manage_roles") || isActive("/create_role")
                ? "active"
                : ""
            }`}
          >
            <Link className="sidebar-link" to={"/manage_roles"}>
              <i className="align-middle" data-feather="shield"></i>
              <span className="align-middle">Manage Roles</span>
            </Link>
          </li>
        </ul>
      </SimpleBar>
    </nav>
  );
};

export default Sidebar;
