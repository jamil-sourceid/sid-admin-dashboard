/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import "./style.css";
import { Layoutprops } from "./models";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ToastContainer } from "react-toastify";
import { useEnv } from "@/context";
import { getServerEnv } from "@/hooks/getEnv";
// import ZendeskWidget, { toggleZendeskWidget } from "@/components/zendesk-widget";

const AuthLayout: React.FC<Layoutprops> = ({
  children,
  showSecondaryImage,
}) => {
  const router = useRouter();
  const { setEnvVariables } = useEnv();

  const getFullYear = new Date().getFullYear();

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      router.replace("/dashboard"); // Redirect authenticated users
    }
  }, [router]);

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

  // const handleSupportClick = () => {
  //   toggleZendeskWidget(true);
  // };

  return (
    <div className="auth-layout">
      {/* <ZendeskWidget /> */}

      <div className="auth-layout__form_container">
        <div className="header">
          <Link href="/">
            <img src="/assets/images/logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className="children-container">{children}</div>
        <div className="footer">
          <p>© Source ID {getFullYear}</p>
          <button>
            <img src="/assets/icons/mail.svg" alt="Mail" className="mr-2" />{" "}
            Support
          </button>
        </div>
      </div>

      <div className="auth-layout__info">
        <h1>
          AI-Powered Solutions Driving <br /> Seamless Onboarding, Verification,
          <br /> and Revenue Across the Globe.
        </h1>

        <img
          src={
            !showSecondaryImage
              ? "/assets/images/auth-img.png"
              : "/assets/images/auth-img-two.png"
          }
          alt=""
        />
      </div>

      <ToastContainer autoClose={false} />
    </div>
  );
};

export default AuthLayout;
