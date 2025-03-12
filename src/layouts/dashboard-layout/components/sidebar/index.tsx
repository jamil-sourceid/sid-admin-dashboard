import React, { useState } from 'react';
import './style.css';

import { NavLink, Link, useLocation } from 'react-router';
import { Input, Popover } from 'antd';
import UserPopOver from '../userpopover';

import Logo from '../../../../assets/images/logo.svg';
import LogoMini from '../../../../assets/images/logo-mini.svg';
import Search from '../../../../assets/icons/search.svg';

import Dashboard from '../../../../assets/icons/dashboard.svg';
import Module from '../../../../assets/icons/module.svg';
import RoleManagement from '../../../../assets/icons/role.svg';
import Logs from '../../../../assets/icons/logs.svg';
// import ConfigApi from '../../../../assets/icons/config.svg';
// import Billing from '../../../../assets/icons/billing.svg';
import Support from '../../../../assets/icons/support.svg';
import Documentation from '../../../../assets/icons/documentation.svg';
import Settings from '../../../../assets/icons/settings.svg';
import Arrow from '../../../../assets/icons/updown.svg';
import ArrowDown from '../../../../assets/icons/arrow-down.svg';
import Menu from '../../../../assets/icons/menu.svg';
import Expand from '../../../../assets/icons/expand.svg';
import { UserBoard, OnlineStatus, MinifiedUserBoard } from '../user-board';

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
    <div
      className={`dashboard-layout-wrapper__sidebar ${
        isCollapsed ? 'collapsed' : ''
      }`}
    >
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
            <Input
              size="large"
              placeholder="Search"
              prefix={<img src={Search} alt="Search" />}
            />
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

          <li
            title="Modules"
            className={`dropdown ${dropdowns.modules && 'open'} ${
              isDropdownActive([
                '/dashboard/modules/kyc',
                '/dashboard/modules/kyb',
              ]) && 'active'
            }`}
            onClick={(): void => toggleDropdown('modules')}
          >
            <div className="dropdown-header">
              <div className="dropdown-header-content">
                <img src={Module} alt="" className="icon" />
                {!isCollapsed && 'Modules'}
              </div>
              {!isCollapsed && (
                <img
                  src={ArrowDown}
                  alt="Toggle dropdown"
                  className={`dropdown-arrow ${
                    dropdowns.logs ? 'rotated' : ''
                  }`}
                />
              )}
            </div>
            {!isCollapsed && dropdowns.modules && (
              <ul className="dropdown-menu">
                <NavLink
                  to="/dashboard/modules/kyc"
                  className={({ isActive }): string =>
                    isActive ? 'active' : ''
                  }
                >
                  <li>KYC</li>
                </NavLink>
                <NavLink
                  to="/dashboard/modules/kyb"
                  className={({ isActive }): string =>
                    isActive ? 'active' : ''
                  }
                >
                  <li>KYB</li>
                </NavLink>
              </ul>
            )}
          </li>

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
              isDropdownActive([
                '/dashboard/logs/audit-log',
                '/dashboard/logs/api-log',
              ]) && 'active'
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
                  className={`dropdown-arrow ${
                    dropdowns.logs ? 'rotated' : ''
                  }`}
                />
              )}
            </div>
            {!isCollapsed && dropdowns.logs && (
              <ul className="dropdown-menu">
                <NavLink
                  to="/dashboard/logs/audit-log"
                  className={({ isActive }): string =>
                    isActive ? 'active' : ''
                  }
                >
                  <li>Audit Log</li>
                </NavLink>
                <NavLink
                  to="/dashboard/logs/api-log"
                  className={({ isActive }): string =>
                    isActive ? 'active' : ''
                  }
                >
                  <li>API Log</li>
                </NavLink>
              </ul>
            )}
          </li>

          {/* <li
            title="Configuration"
            className={`dropdown ${dropdowns.configs && 'open'} ${
              isDropdownActive([
                '/dashboard/configuration/verification-criteria-acceptance',
                '/dashboard/configuration/default-weight',
              ]) && 'active'
            }`}
            onClick={(): void => toggleDropdown('configs')}
          >
            <div className="dropdown-header">
              <div className="dropdown-header-content">
                <img src={ConfigApi} alt="" className="icon" />
                {!isCollapsed && 'Configuration'}
              </div>
              {!isCollapsed && (
                <img
                  src={ArrowDown}
                  alt="Toggle dropdown"
                  className={`dropdown-arrow ${
                    dropdowns.configs ? 'rotated' : ''
                  }`}
                />
              )}
            </div>
            {!isCollapsed && dropdowns.configs && (
              <ul className="dropdown-menu">
                <NavLink
                  to="/dashboard/configuration/verification-criteria-acceptance"
                  className={({ isActive }): string =>
                    isActive ? 'active' : ''
                  }
                >
                  <li>Verification Criteria Acceptance</li>
                </NavLink>
                <NavLink
                  to="/dashboard/configuration/default-weighting"
                  className={({ isActive }): string =>
                    isActive ? 'active' : ''
                  }
                >
                  <li>(Default Weighting 0-10)</li>
                </NavLink>
              </ul>
            )}
          </li> */}

          {/* <NavLink
            to="/dashboard/billing"
            className={({ isActive }): string => (isActive ? 'active' : '')}
          >
            <li className="menu-list" title="Billing">
              <img src={Billing} alt="" className="icon" />
              {!isCollapsed && 'Billing'}
            </li>
          </NavLink> */}
        </ul>
      </div>

      <div className="bottom-navigations">
        <ul className="sidebar-navigation-list">
          <li className="support" title="Support">
            <div>
              <img src={Support} alt="" className="icon" />
              {!isCollapsed && 'Support'}
            </div>
            {!isCollapsed && <OnlineStatus />}
          </li>

          <li title="Documentation">
            <img src={Documentation} alt="" className="icon" />
            {!isCollapsed && 'Documentation'}
          </li>
          <Link to="/dashboard/settings">
            <li title="Settings">
              <img src={Settings} alt="" className="icon" />
              {!isCollapsed && 'Settings'}
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
              <img src={Arrow} alt="" />
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
