"use client";

// React dependencies
import { ReactNode } from "react";

// MUI dependencies
import { Box, Container } from "@mui/material";

// Components
import LayoutHeader from "./header/LayoutHeader";
import LayoutFooter from "./footer/LayoutFooter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <LayoutHeader />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <LayoutFooter />
    </Box>
  );
}
