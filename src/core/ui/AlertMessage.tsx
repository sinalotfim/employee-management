'use client';

// Material UI dependencies
import { Alert, Snackbar } from '@mui/material';

// Models
import { AlertMessageSeverity } from '../model';

interface AlertMessageProps {
    open: boolean;
    message: string;
    severity: AlertMessageSeverity;
    onClose: () => void;
}

export default function AlertMessage({ open, message, severity, onClose }: AlertMessageProps) {
    const handleClose = () => {
        onClose();
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
