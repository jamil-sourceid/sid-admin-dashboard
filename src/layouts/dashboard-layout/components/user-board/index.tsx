/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import "./style.css";

const UserBoard: React.FC = () => {
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
        <h3 className="capitalize">Jamil Huddin</h3>
        <p>Jamil@sourceid.tech</p>
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
