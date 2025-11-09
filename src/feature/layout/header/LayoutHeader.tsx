'use client';

// MUI dependencies
import { AppBar, Toolbar, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function LayoutHeader() {
    return (
        <AppBar position="static">
            <Toolbar>
                <PeopleAltIcon sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Employee Management Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
