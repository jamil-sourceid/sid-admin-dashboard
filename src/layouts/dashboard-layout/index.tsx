import React, { useState } from 'react';
import './style.css';
import { Badge } from 'antd';
import { DashboardLayoutprops } from './models';
import SideBar from './components/sidebar';
import { Link } from 'react-router';

import { useIdleTimer } from 'react-idle-timer';

import Notification from '../../assets/icons/notification.svg';
import Settings from '../../assets/icons/settings.svg';
import IdleModal from './components/idleModal';
import { signOut } from '../../helpers/helper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout: React.FC<DashboardLayoutprops> = ({
  children,
  pageTitle,
  pageDesc,
  pageClass,
  pageTag,
  customComponent,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('isCollapsed') === 'true';
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleSidebar = (): void => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem('isCollapsed', newState.toString());
      return newState;
    });
  };

  // Function to log out user
  const logoutUser = (): void => {
    setIsModalVisible(false);
    signOut();
  };

  // Function to reset idle timer and close the modal
  const handleContinue = (): void => {
    setIsModalVisible(false);
    resetIdleTimer();
  };

  // Idle Timer
  const { reset: resetIdleTimer } = useIdleTimer({
    timeout: 3 * 60 * 1000,
    onIdle: () => {
      setIsModalVisible(true);
    },
    debounce: 500,
  });

  return (
    <div className={`dashboard-layout-wrapper ${pageClass || ''}`}>
      <SideBar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

      <div
        className={`dashboard-layout-wrapper__content ${isCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        <div className="page-topbar">
          <div className="page-topbar__useraccount">
            <div className="pageTag">{pageTag}</div>
            <div className="topbar-actions flex">
              <Link to="/dashboard/settings">
                <img src={Settings} alt="" />
              </Link>
              <Link to="/dashboard/profile?tab=notifications">
                <Badge count={5} overflowCount={9} showZero>
                  <img src={Notification} alt="" />
                </Badge>
              </Link>
            </div>
          </div>
          <div className="page-title-container">
            <div>
              <h1 className="pageTitle">{pageTitle}</h1>
              <p className="pageDesc">{pageDesc}</p>
            </div>
            {customComponent}
          </div>
        </div>

        <div className={`page-content ${pageClass || ''}`}>{children}</div>
      </div>

      <IdleModal
        open={isModalVisible}
        logoutBtnAction={(): void => logoutUser()}
        continueBtnAction={(): void => handleContinue()}
      />

      <ToastContainer autoClose={5000} hideProgressBar={true} closeButton={false} />
    </div>
  );
};

export default DashboardLayout;
