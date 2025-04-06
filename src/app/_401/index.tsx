/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import "./style.css";
import { handleRedirect } from "@/components/permissions";

const Page401: React.FC = () => {
  const goBack = (): void => {
    const token = sessionStorage.getItem("authToken");
    const redirect = sessionStorage.getItem("permissions");

    if (token && redirect) {
      handleRedirect();
    } else {
      window.location.replace("/");
    }
  };

  return (
    <div className="page-401">
      <img src="/assets/images/401.svg" alt="" />
      <h1>Unauthorized</h1>
      <p>Oops! You do not have the authorization<br /> to access this page.</p>
      <button onClick={(): void => goBack()}>Ok</button>
    </div>
  );
};

export default Page401;
