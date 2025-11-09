// Next dependencies
import React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

// CSS dependencies
import "./styles/root.css";

// Components
import AppProvider from "./provider";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Employee Management Dashboard",
  description: "A dashboard for managing employee data",
  icons: {
    icon: "/favicon.svg",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
