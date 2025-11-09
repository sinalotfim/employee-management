"use client";

// React dependencies
import React, { useState, useEffect } from "react";

// MUI dependencies
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// App dependencies
import { theme } from "@/core/constant";

interface ProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: ProviderProps) {
  // Use state to control mounting to avoid hydration issues in emotion
  const [isMounted, setIsMounted] = useState(false);

  // Only run on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During server-side rendering or initial client render, use a simplified structure
  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  // Once mounted on client, render the full component with MUI
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
