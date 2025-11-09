import { AlertMessageSeverity } from "./alert.model";

export interface AlertContextState {
    alertOpen: boolean;
    alertMessage: string;
    alertSeverity: AlertMessageSeverity;
    showAlert: (message: string, severity: AlertMessageSeverity) => void;
    hideAlert: () => void;
}

export interface ConfirmContextState {
    confirmOpen: boolean;
    confirmTitle: string;
    confirmContent: string;
    confirmAction: () => void;
    showConfirm: (title: string, content: string, action: () => void) => void;
    hideConfirm: () => void;
}

export interface UIContextState {
    alert: AlertContextState;
    confirm: ConfirmContextState;
}
