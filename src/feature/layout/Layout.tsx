"use client";

// React dependencies
import { ReactNode, useState } from "react";

// MUI dependencies
import { Box, Container } from "@mui/material";

// Components
import LayoutHeader from "./header/LayoutHeader";
import LayoutFooter from "./footer/LayoutFooter";
import AlertMessage from "@/core/ui/AlertMessage";
import ConfirmDialog from "@/core/ui/ConfirmDialog";

// App dependencies
import { AlertMessageSeverity, UIContextState } from "@/core/model";
import { UIContext } from "@/core/context";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertMessageSeverity>(
    AlertMessageSeverity.INFO
  );

  // Confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmContent, setConfirmContent] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

  // Alert handlers
  const showAlert = (message: string, severity: AlertMessageSeverity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const hideAlert = () => {
    setAlertOpen(false);
  };

  // Confirm dialog handlers
  const showConfirm = (title: string, content: string, action: () => void) => {
    setConfirmTitle(title);
    setConfirmContent(content);
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

  const hideConfirm = () => {
    setConfirmOpen(false);
  };

  // Create context value
  const contextValue: UIContextState = {
    alert: {
      alertOpen,
      alertMessage,
      alertSeverity,
      showAlert,
      hideAlert,
    },
    confirm: {
      confirmOpen,
      confirmTitle,
      confirmContent,
      confirmAction,
      showConfirm,
      hideConfirm,
    },
  };

  return (
    <UIContext.Provider value={contextValue}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <LayoutHeader />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          {children}
        </Container>
        <LayoutFooter />

        {/* Global Alert and Confirm components */}
        <AlertMessage
          open={alertOpen}
          message={alertMessage}
          severity={alertSeverity}
          onClose={hideAlert}
        />
        <ConfirmDialog
          open={confirmOpen}
          title={confirmTitle}
          content={confirmContent}
          onConfirm={() => {
            confirmAction();
            hideConfirm();
          }}
          onCancel={hideConfirm}
        />
      </Box>
    </UIContext.Provider>
  );
}
