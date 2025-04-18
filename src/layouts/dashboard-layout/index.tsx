/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import "./style.css";
import { Badge } from "antd";
import { DashboardLayoutprops } from "./models";
import SideBar from "./components/sidebar";
import Link from "next/link";

import { useIdleTimer } from "react-idle-timer";

import IdleModal from "./components/idleModal";
import { signOut } from "@/helpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEnv } from "@/context";
import { getServerEnv } from "@/hooks/getEnv";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import PageLoader from "@/components/page-loader";
import NotificationDrawer from "./components/notification";

const DashboardLayout: React.FC<DashboardLayoutprops> = ({
  children,
  pageTitle,
  pageDesc,
  pageClass,
  pageTag,
  customComponent,
}) => {
  const { setEnvVariables } = useEnv();
  const isAuthenticated = useAuthRedirect();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleSidebar = (): void => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("isCollapsed", newState.toString());
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

  useEffect(() => {
    const storedValue = localStorage.getItem("isCollapsed") === "true";
    setIsCollapsed(storedValue);
  }, []);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const key = await getServerEnv();
        if (isMounted) {
          setEnvVariables(key);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch environment variables:", error);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [setEnvVariables]);

  return (
    <div className={`dashboard-layout-wrapper ${pageClass || ""}`}>
      <SideBar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

      {isAuthenticated === null ? (
        <div
          className={`dashboard-layout-wrapper__content ${
            isCollapsed ? "sidebar-collapsed" : ""
          }`}
        >
          <PageLoader />
        </div>
      ) : (
        <div
          className={`dashboard-layout-wrapper__content ${
            isCollapsed ? "sidebar-collapsed" : ""
          }`}
        >
          <div className="page-topbar">
            <div className="page-topbar__useraccount">
              <div className="pageTag">{pageTag}</div>
              <div className="topbar-actions flex">
                <Link href="/dashboard/settings">
                  <img src="/assets/icons/settings.svg" alt="" />
                </Link>
                {/* <Link href="/dashboard/profile?tab=notifications"> */}
                <Badge overflowCount={9} showZero>
                  <img
                    src="/assets/icons/notification.svg"
                    alt=""
                    onClick={() => setIsNotificationOpen(true)}
                  />
                </Badge>
                {/* </Link> */}
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

          <div className={`page-content ${pageClass || ""}`}>{children}</div>
        </div>
      )}

      <IdleModal
        open={isModalVisible}
        logoutBtnAction={(): void => logoutUser()}
        continueBtnAction={(): void => handleContinue()}
      />

      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        closeButton={false}
      />

      <NotificationDrawer
        open={isNotificationOpen}
        loading={false}
        close={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export default DashboardLayout;
