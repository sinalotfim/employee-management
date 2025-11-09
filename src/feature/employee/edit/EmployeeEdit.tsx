"use client";

// React dependencies
import React, { useState } from "react";

// Material UI dependencies
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";

// Validation dependencies
import { z } from "zod";

// Core models
import { EmployeeFormData } from "@/core/model";

interface EmployeeEditProps {
    open: boolean;
    employee: EmployeeFormData;
    onClose: () => void;
    onSubmit: (data: EmployeeFormData) => void;
}

export default function EmployeeEdit({ open, employee, onClose, onSubmit }: EmployeeEditProps) {
    const schema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z
            .string()
            .min(1, "Email is required")
            .refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
                message: "Invalid email format",
            }),
        position: z.string().min(1, "Position is required"),
        salary: z.number().positive("Salary must be greater than 0"),
    });

    // Initialize form data with employee data
    const [formData, setFormData] = useState<EmployeeFormData>(employee);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        try {
            schema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<string, string> = {};
                error.issues.forEach(err => {
                    if (!!err.path.length) errors[err.path[0].toString()] = err.message;
                });
                setErrors(errors);
            }
            return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = name === "salary" ? +value : value;
        setFormData(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return;
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    elevation: 3,
                    sx: { borderRadius: 2 },
                },
            }}
        >
            <DialogTitle sx={{ pb: 1, pt: 2, px: 3 }}>Edit Employee</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name}
                            size="medium"
                        />
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email}
                            size="medium"
                        />
                        <TextField
                            name="position"
                            label="Position"
                            value={formData.position}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.position}
                            helperText={errors.position}
                            size="medium"
                        />
                        <TextField
                            name="salary"
                            label="Salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.salary}
                            helperText={errors.salary}
                            size="medium"
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                },
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
