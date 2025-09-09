/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { selectUserName, selectUserEmail } from "@/store/auth/selectors";
import "./style.css";

const UserBoard: React.FC = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  return (
    <div className="user-board">
      <div className="user-image">
        <img
          src="/assets/icons/admin-icon.svg"
          alt="User Profile"
          className="h-20 w-20 rounded-full object-cover"
        />

        <div className="status online" />
      </div>

      <div className="user-info">
        <h3 className="capitalize">{userName || 'User'}</h3>
        <p>{userEmail || 'user@example.com'}</p>
      </div>
    </div>
  );
};

const MinifiedUserBoard: React.FC = () => {
  return (
    <div className="user-board minified">
      <div className="user-image">
        <img
          src="/assets/icons/admin-icon.svg"
          alt="User Profile"
          className="h-20 w-20 rounded-full object-cover"
        />

        <div className="status online" />
      </div>
    </div>
  );
};

const OnlineStatus: React.FC = () => {
  return (
    <div className="status-board">
      <div className="status-circle online"></div>
      <p>Online</p>
    </div>
  );
};

export { UserBoard, OnlineStatus, MinifiedUserBoard };
