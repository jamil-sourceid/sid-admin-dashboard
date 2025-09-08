"use client";

import React from "react";
import "./style.css";
import SourceIdButton from "@/components/button";

const SignIn: React.FC = () => {

  return (
    <div className="sign-in-form-container">
      <h2>Sign In</h2>
      <p>Sign in using your Authentik account</p>

      {/* Sign in with Authentik button */}
      <SourceIdButton
        btnType="button"
        btnTxt="Sign in with Authentik"
        btnClass="mt-6"
        btnClick={() => {
          window.location.href = "https://instrumental-dans-adaptation-dawn.trycloudflare.com/v1/api/auth/admin/authentik";
        }}
      />

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
