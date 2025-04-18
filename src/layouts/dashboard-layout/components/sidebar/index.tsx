/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo } from "react";
import "./style.css";

// import { NavLink, Link, useLocation } from "react-router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover } from "antd";
import UserPopOver from "../userpopover";

import { UserBoard, OnlineStatus, MinifiedUserBoard } from "../user-board";

import { SideBarprops } from "./models";

export const menuItems = [
  {
    title: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    path: "/dashboard",
    key: "dashboard",
    type: "link",
    items: [],
    hidden: false,
    permissions: []
  },
  {
    title: "Organisation",
    icon: "/assets/icons/organisation.svg",
    path: "/dashboard/organisation",
    key: "organisation",
    type: "link",
    items: [],
    hidden: false,
    permissions: []
  },
  {
    title: "Customers",
    icon: "/assets/icons/user.svg",
    path: "/dashboard/customers",
    key: "customer",
    type: "link",
    items: [],
    hidden: false,
    permissions: []
  },
  {
    title: "Modules",
    icon: "/assets/icons/module.svg",
    type: "dropdown",
    key: "modules",
    items: [
      {
        title: "KYC",
        path: "/dashboard/modules/kyc",
        permissions: ["own-org", "r-kyc"],
      },
      {
        title: "KYB",
        path: "/dashboard/modules/kyb",
        permissions: ["own-org", "r-kyb"],
      },
    ],
    hidden: true,
    permissions: [],
  },
];

const SideBar: React.FC<SideBarprops> = ({ toggleSidebar, isCollapsed }) => {
  // const location = useLocation();
  const pathnameMaybe = usePathname();
  const pathname = pathnameMaybe || "/dashboard";
  const initialDropdownState = useMemo(() => {
    const state: { [key: string]: boolean } = {};
    menuItems.forEach((item) => {
      if (item.type === "dropdown") {
        state[item.key] = item.items.some((subItem) =>
          pathname.includes(subItem.path)
        );
      }
    });
    return state;
  }, [pathname]);

  // Get user permissions from session storage
  const userPermissions = useMemo(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(sessionStorage.getItem("permissions") || "[]");
    }
    return [];
  }, []);

  // Function to check if user has required permissions
  const hasPermission = (requiredPermissions: string[]) => {
    return requiredPermissions.some((perm) => userPermissions.includes(perm));
  };

  const [open, setOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>(
    initialDropdownState
  ); // State for dynamic dropdowns

  const handleOpenChange = (newOpen: boolean): void => {
    setOpen(newOpen);
  };

  const toggleDropdown = (key: string): void => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Check if the current path is within a dropdown's children
  const isDropdownActive = (paths: string[]): boolean => {
    return paths.some((path) => pathname.includes(path));
  };

  const filteredMenuItems = menuItems
    .map((item) => ({
      ...item,
      items: item.items?.filter((subItem) =>
        hasPermission(subItem.permissions)
      ), // Filter sub-items
    }))
    .filter((item) => item.type !== "dropdown" || item.items.length > 0);

  return (
    <div
      className={`dashboard-layout-wrapper__sidebar ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <div className="top-navigations">
        <div className="logo-container">
          {!isCollapsed && (
            <img className="logo" src="/assets/images/logo.svg" alt="Logo" />
          )}
          <img
            src={
              !isCollapsed
                ? "/assets/icons/menu.svg"
                : "/assets/icons/expand.svg"
            }
            alt=""
            className="hamburger-menu"
            onClick={(): void => toggleSidebar(!isCollapsed)}
          />
        </div>

        <ul className="sidebar-navigation-list">
          {isCollapsed && (
            <Link href="/dashboard">
              <li className="logo-mini">
                <img src="/assets/images/logo-mini.svg" alt="" />
              </li>
            </Link>
          )}

          {filteredMenuItems
            .filter((item) => item.hidden === false)
            .map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.path}
                  href={item.path || ""}
                  className={pathname === item.path ? "active" : ""}
                >
                  <li className="menu-list" title={item.title}>
                    <img src={item.icon} alt="" className="icon" />
                    {!isCollapsed && item.title}
                  </li>
                </Link>
              ) : isCollapsed ? (
                <Popover
                  key={item.key}
                  placement="right"
                  content={
                    <ul className="popover-submenu-dropdown">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={
                            pathname.includes(subItem.path) ? "active" : ""
                          }
                        >
                          <li>{subItem.title}</li>
                        </Link>
                      ))}
                    </ul>
                  }
                  trigger="hover"
                >
                  <li
                    title={item.title}
                    className={`dropdown ${dropdowns[item.key] && "open"} ${
                      isDropdownActive(item.items.map((sub) => sub.path)) &&
                      "active"
                    }`}
                  >
                    <div className="dropdown-header">
                      <div className="dropdown-header-content">
                        <img src={item.icon} alt="" className="icon" />
                      </div>
                    </div>
                  </li>
                </Popover>
              ) : (
                <li
                  key={item.key}
                  title={item.title}
                  className={`dropdown ${dropdowns[item.key] && "open"} ${
                    isDropdownActive(item.items.map((sub) => sub.path)) &&
                    "active"
                  }`}
                  onClick={(): void => toggleDropdown(item.key)}
                >
                  <div className="dropdown-header">
                    <div className="dropdown-header-content">
                      <img src={item.icon} alt="" className="icon" />
                      {item.title}
                    </div>
                    {!isCollapsed && (
                      <img
                        src="/assets/icons/arrow-down.svg"
                        alt="Toggle dropdown"
                        className={`dropdown-arrow ${
                          dropdowns[item.key] ? "rotated" : ""
                        }`}
                      />
                    )}
                  </div>
                  {!isCollapsed && dropdowns[item.key] && (
                    <ul className="dropdown-menu">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={
                            pathname.includes(subItem.path) ? "active" : ""
                          }
                        >
                          <li>{subItem.title}</li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
        </ul>
      </div>

      <div className="bottom-navigations">
        <ul className="sidebar-navigation-list">
          <li
            className="support"
            title="Support"
            style={{ cursor: "pointer" }}
          >
            <div>
              <img src="/assets/icons/support.svg" alt="" className="icon" />
              {!isCollapsed && "Support"}
            </div>
            {!isCollapsed && <OnlineStatus />}
          </li>

          <a
            href="https://docs.sourceid.tech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li title="Documentation">
              <img
                src="/assets/icons/documentation.svg"
                alt=""
                className="icon"
              />
              {!isCollapsed && "Documentation"}
            </li>
          </a>

          <Link href="/dashboard/settings">
            <li title="Settings">
              <img src="/assets/icons/settings.svg" alt="" className="icon" />
              {!isCollapsed && "Settings"}
            </li>
          </Link>
        </ul>

        {!isCollapsed ? (
          <Popover
            content={<UserPopOver />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="topLeft"
          >
            <div className="mt-4 user-container">
              <UserBoard />
              <img src="/assets/icons/updown.svg" alt="" />
            </div>
          </Popover>
        ) : (
          <Popover
            content={<UserPopOver />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="topLeft"
          >
            <div>
              <MinifiedUserBoard />
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default SideBar;
