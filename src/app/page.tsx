"use client";

import React from "react";
import AuthLayout from "@/layouts/auth-layout";
import SignIn from "./_sign-in";

export default function Home() {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
}
