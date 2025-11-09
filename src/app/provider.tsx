"use client";

// React dependencies
import React, { useState, useEffect } from "react";

// Redux dependencies
import { Provider } from "react-redux";

// MUI dependencies
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// App dependencies
import { store } from "@/state/store";
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
        return (
            <Provider store={store}>
                <div style={{ visibility: "hidden" }}>{children}</div>
            </Provider>
        );
    }

    // Once mounted on client, render the full component with MUI
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>{children}</Provider>
        </ThemeProvider>
    );
}
