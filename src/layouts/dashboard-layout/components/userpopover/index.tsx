/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import { UserBoard } from "../user-board";
import { signOut } from "@/helpers";

const UserPopOver: React.FC = () => {
  return (
    <div className="user-account-popover">
      <div className="section-one">
        <UserBoard />
      </div>
      <div className="section-two">
        <li>
          <img src="/assets/icons/user.svg" alt="" /> Profile
        </li>
        <li>
          <img src="/assets/icons/settings.svg" alt="" /> Settings
        </li>{" "}
      </div>
      <div className="section-three">
        <li onClick={(): void => signOut()}>
          <img src="/assets/icons/logout.svg" alt="" /> Sign out
        </li>
      </div>
    </div>
  );
};

export default UserPopOver;
