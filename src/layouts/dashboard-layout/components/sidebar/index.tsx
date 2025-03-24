import React, { useState } from 'react';
import './style.css';

import { NavLink, Link, useLocation } from 'react-router';
import { Input, Popover } from 'antd';
import UserPopOver from '../userpopover';

import Logo from '../../../../assets/images/logo.svg';
import LogoMini from '../../../../assets/images/logo-mini.svg';
import Search from '../../../../assets/icons/search.svg';

import Dashboard from '../../../../assets/icons/dashboard.svg';
import Organisation from '../../../../assets/icons/module.svg';
import Customer from '../../../../assets/icons/user.svg';
import RoleManagement from '../../../../assets/icons/role.svg';
import Logs from '../../../../assets/icons/logs.svg';
import Billing from '../../../../assets/icons/billing.svg';
import Support from '../../../../assets/icons/support.svg';
import Documentation from '../../../../assets/icons/documentation.svg';
import Settings from '../../../../assets/icons/settings.svg';
import Arrow from '../../../../assets/icons/updown.svg';
import ArrowDown from '../../../../assets/icons/arrow-down.svg';
import Menu from '../../../../assets/icons/menu.svg';
import Expand from '../../../../assets/icons/expand.svg';
import { UserBoard, MinifiedUserBoard } from '../user-board';

import { SideBarprops } from './models';

const SideBar: React.FC<SideBarprops> = ({ toggleSidebar, isCollapsed }) => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({}); // State for dynamic dropdowns

  const handleOpenChange = (newOpen: boolean): void => {
    setOpen(newOpen);
  };

  const toggleDropdown = (key: string): void => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the specific dropdown
    }));
  };

  // Check if the current path is within a dropdown's children
  const isDropdownActive = (paths: string[]): boolean => {
    return paths.some((path) => location.pathname.includes(path));
  };

  return (
    <div className={`dashboard-layout-wrapper__sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="top-navigations">
        <div className="logo-container">
          {!isCollapsed && <img className="logo" src={Logo} alt="Logo" />}
          <img
            src={!isCollapsed ? Menu : Expand}
            alt=""
            className="hamburger-menu"
            onClick={(): void => toggleSidebar(!isCollapsed)}
          />
        </div>

        {!isCollapsed && (
          <div className="input-container">
            <Input size="large" placeholder="Search" prefix={<img src={Search} alt="Search" />} />
          </div>
        )}

        <ul className="sidebar-navigation-list">
          {isCollapsed && (
            <Link to="/dashboard">
              <li className="logo-mini">
                <img src={LogoMini} alt="" />
              </li>
            </Link>
          )}

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }): string => (isActive ? 'active' : '')}
          >
            <li className="menu-list" title="Dashboard">
              <img src={Dashboard} alt="" className="icon" />
              {!isCollapsed && 'Dashboard'}
            </li>
          </NavLink>

          <NavLink
            to="/dashboard/organisation"
            className={({ isActive }): string => (isActive ? 'active' : '')}
          >
            <li className="menu-list" title="Organisation">
              <img src={Organisation} alt="" className="icon" />
              {!isCollapsed && 'Organisation'}
            </li>
          </NavLink>

          <NavLink
            to="/dashboard/customers"
            className={({ isActive }): string => (isActive ? 'active' : '')}
          >
            <li className="menu-list" title="Customers">
              <img src={Customer} alt="" className="icon" />
              {!isCollapsed && 'Customers'}
            </li>
          </NavLink>

          <NavLink
            to="/dashboard/role-management"
            className={({ isActive }): string => (isActive ? 'active' : '')}
          >
            <li className="menu-list" title="Role Management">
              <img src={RoleManagement} alt="" className="icon" />
              {!isCollapsed && 'Role Management'}
            </li>
          </NavLink>

          <li
            title="Logs"
            className={`dropdown ${dropdowns.logs && 'open'} ${
              isDropdownActive(['/dashboard/logs/audit-log', '/dashboard/logs/api-log']) && 'active'
            }`}
            onClick={(): void => toggleDropdown('logs')}
          >
            <div className="dropdown-header">
              <div className="dropdown-header-content">
                <img src={Logs} alt="" className="icon" />
                {!isCollapsed && 'Logs'}
              </div>
              {!isCollapsed && (
                <img
                  src={ArrowDown}
                  alt="Toggle dropdown"
                  className={`dropdown-arrow ${dropdowns.logs ? 'rotated' : ''}`}
                />
              )}
            </div>
            {!isCollapsed && dropdowns.logs && (
              <ul className="dropdown-menu">
                <NavLink
                  to="/dashboard/logs/audit-log"
                  className={({ isActive }): string => (isActive ? 'active' : '')}
                >
                  <li>Audit Log</li>
                </NavLink>
                <NavLink
                  to="/dashboard/logs/api-log"
                  className={({ isActive }): string => (isActive ? 'active' : '')}
                >
                  <li>API Log</li>
                </NavLink>
              </ul>
            )}
          </li>

          <NavLink
            to="/dashboard/billing"
            className={({ isActive }): string => (isActive ? 'active' : '')}
          >
            <li className="menu-list" title="Billing">
              <img src={Billing} alt="" className="icon" />
              {!isCollapsed && 'Billing'}
            </li>
          </NavLink>
        </ul>
      </div>

      <div className="bottom-navigations">
        <ul className="sidebar-navigation-list">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }): string => (isActive ? 'active' : '')}
          >
            <li className="menu-list" title="Settings">
              <img src={Settings} alt="" className="icon" />
              {!isCollapsed && 'Settings'}
            </li>
          </NavLink>

          <NavLink to="https://docs.usesourceid.com/v1/" target="_blank">
            <li className="menu-list" title="Documentation">
              <img src={Documentation} alt="" className="icon" />
              {!isCollapsed && 'Documentation'}
            </li>
          </NavLink>

          <li className="menu-list support" title="Support">
            <div>
              <img src={Support} alt="" className="icon" />
              {!isCollapsed && 'Support'}
            </div>
            {!isCollapsed && <img src={Arrow} alt="" />}
          </li>
        </ul>

        {isCollapsed ? (
          <MinifiedUserBoard />
        ) : (
          <Popover
            content={<UserPopOver />}
            title=""
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            overlayClassName="user-account-popover"
            placement="rightTop"
          >
            <div className="user-container">
              <UserBoard />
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default SideBar;
