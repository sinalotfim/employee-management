'use client';

// React dependencies
import React from 'react';

// MUI dependencies
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';

interface EmployeeFilterProps {
    onFilterChange: (text: string) => void;
}

export default function EmployeeFilter({ onFilterChange }: EmployeeFilterProps) {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input: HTMLInputElement = event.target;
        onFilterChange(input.value);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="employeeSearch" shrink>
                    Search
                </InputLabel>
                <OutlinedInput
                    fullWidth
                    id="employeeSearch"
                    label="Search"
                    placeholder="Search employees by name, email, position, or salary"
                    onChange={handleSearchChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
}
