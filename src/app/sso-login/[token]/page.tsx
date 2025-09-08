"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { AppDispatch } from "@/store";
import { ssoLoginRequest } from "@/store/auth/actions";
import { selectAuthLoading } from "@/store/auth/selectors";
import PageLoader from "@/components/page-loader";
import "./style.css";

const SsoLoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (!params || !params.token) {
      console.log('SSO Login Page: No token found, redirecting to sign-in');
      router.push("/");
      return;
    }

    const token = params.token as string;

    console.log('SSO Login Page: Token from URL:', token);

    if (token) {
      // Dispatch the SSO login action with the token from the URL
      console.log('SSO Login Page: Dispatching SSO login request');

      if (typeof window !== 'undefined') {
        sessionStorage.setItem("authToken", `Bearer ${token}`)
        router.push("/dashboard");
      } else {
        console.log('useEffect is running during server-side rendering (or in a non-browser environment).');
      }
      dispatch(ssoLoginRequest({ token }));
    } else {
      console.log('SSO Login Page: No token found, redirecting to sign-in');
      // If no token, redirect to sign-in
      router.push("/");
    }
  }, [dispatch, params?.token, router]);

  return (
    <div className="sso-login-container">
      <div className="sso-login-content">
        <h2>Signing you in...</h2>
        <p>Please wait while we authenticate you with Authentik.</p>
        {loading && <PageLoader />}
      </div>
    </div>
  );
};

export default SsoLoginPage;
