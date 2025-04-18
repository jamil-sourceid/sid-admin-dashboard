"use client";

import React from "react";
import "./globals.css";

import { EnvProvider } from "@/context";
import "@ant-design/v5-patch-for-react-19";
import { Provider } from "react-redux";
import store from "@/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <EnvProvider>{children}</EnvProvider>
        </Provider>
      </body>
    </html>
  );
}
