"use client";

// MUI dependencies
import { Box, Button, Typography } from "@mui/material";

interface EmployeeHeaderProps {
    onAddClick: () => void;
}

export default function EmployeeHeader({ onAddClick }: EmployeeHeaderProps) {
    const handleAddClick = () => {
        onAddClick();
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" component="h2">
                Employees
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddClick}>
                Add Employee
            </Button>
        </Box>
    );
}
