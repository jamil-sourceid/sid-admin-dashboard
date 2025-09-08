"use client";

import React from "react";
import "./style.css";
import SourceIdButton from "@/components/button";

// Commented out imports for future reference if regular sign-in form is needed
/*
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthLoading,
  selectIsMfaLogin,
  selectQrCode,
  selectUserEmail,
} from "@/store/auth/selectors";
import { loginRequest, twoFaRequest } from "@/store/auth/actions";
import { AppDispatch } from "@/store";
*/

const SignIn: React.FC = () => {
  // Commented out state and logic for future reference
  /*
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectAuthLoading);
  const twoFaRequired = useSelector(selectIsMfaLogin);
  const qrCode = useSelector(selectQrCode);
  const userEmail = useSelector(selectUserEmail);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      otp: '',
    },
    validationSchema: twoFaRequired
      ? Yup.object({
          otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
        })
      : Yup.object({
          email: Yup.string()
            .matches(/^\S+@\S+\.\S+$|^\d{10,15}$/, 'Enter a valid email address')
            .required('Email is required'),
          password: Yup.string().required('Password is required'),
        }),
    onSubmit: (values) => {
      if (twoFaRequired) {
        dispatch(twoFaRequest({ email: userEmail, mfaCode: otp.join('') }));
      } else {
        dispatch(loginRequest({ email: values.email, password: values.password }));
      }
    },
  });
  */

  return (
    <div className="sign-in-form-container">
      {/* Dynamic title and description for future reference */}
      {/* <h2>{twoFaRequired ? "Enter OTP" : "Sign In"}</h2>
      <p>
        {twoFaRequired
          ? qrCode
            ? "Scan this QR Code with your authenticator app and enter OTP"
            : "A one-time password has been sent to your email."
          : "Provide the necessary details to login"}
      </p> */}
      <h2>Sign In</h2>
      <p>Sign in using your Authentik account</p>

      {/* QR Code display for future reference */}
      {/* {twoFaRequired && qrCode && (
        <div className="qr-code-container">
          <img
            src={qrCode}
            alt="QR Code for authentication"
            className="qr-code"
          />
        </div>
      )} */}

      {/* Sign in with Authentik button */}
      <SourceIdButton
        btnType="button"
        btnTxt="Sign in with Authentik"
        btnClass="mt-6"
        btnClick={() => {
          window.location.href = "https://instrumental-dans-adaptation-dawn.trycloudflare.com/v1/api/auth/admin/authentik";
        }}
      />

      {/* Commented out form for future reference if regular sign-in is needed */}
      {/*
      <form onSubmit={formik.handleSubmit} className="mt-2">
        {twoFaRequired ? (
          <>
            <div className="otp-container flex gap-3 ">
              <Input.OTP
                length={6}
                value={otp.join("")}
                onChange={(value): void => {
                  setOtp(value.split(""));
                  formik.setFieldValue("otp", value);
                }}
                autoFocus
                className="otp-input"
              />
            </div>
            {formik.touched.otp && formik.errors.otp ? (
              <div className="error-message">{formik.errors.otp}</div>
            ) : null}
          </>
        ) : (
          <>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                className={
                  formik.touched.email && formik.errors.email ? "error" : ""
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="input-container">
              <label htmlFor="password">Password</label>
              <Input.Password
                id="password"
                name="password"
                placeholder="Enter your password"
                className={
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : ""
                }
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>

            <p className="forgot-password">
              <Link href="/forgot-password">Forgot password?</Link>
            </p>
          </>
        )}

        <SourceIdButton
          btnType="submit"
          btnTxt={twoFaRequired ? "Verify OTP" : "Sign In"}
          btnLoadingTxt={twoFaRequired ? "Verifying..." : "Signing In..."}
          btnClass="mt-6"
          loading={loading}
        />

        {!twoFaRequired && (
          <SourceIdButton
            btnType="button"
            btnTxt="Sign in with Authentik"
            btnClass="mt-4"
            btnClick={() => {
              window.location.href = "https://instrumental-dans-adaptation-dawn.trycloudflare.com/v1/api/auth/admin/authentik";
            }}
          />
        )}
      </form>
      */}
    </div>
  );
};

export default SignIn;
