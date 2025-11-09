"use client";

// MUI dependencies
import { Box, Skeleton, Paper } from "@mui/material";

export default function EmployeeListSkeleton() {
    // Create an array of 5 items to represent rows in the skeleton
    const skeletonRows = Array.from({ length: 5 }, (_, index) => index);

    return (
        <Box sx={{ height: 400, width: "100%", mt: 1 }}>
            {/* Header row */}
            <Box sx={{ display: "flex", mb: 1, px: 2, py: 1.5, bgcolor: "background.paper" }}>
                <Skeleton variant="rectangular" width="70px" height={24} sx={{ mr: 2 }} />
                <Skeleton variant="rectangular" width="200px" height={24} sx={{ mr: 2 }} />
                <Skeleton variant="rectangular" width="250px" height={24} sx={{ mr: 2 }} />
                <Skeleton variant="rectangular" width="200px" height={24} sx={{ mr: 2 }} />
                <Skeleton variant="rectangular" width="130px" height={24} sx={{ mr: 2 }} />
                <Skeleton variant="rectangular" width="100px" height={24} />
            </Box>

            {/* Data rows */}
            {skeletonRows.map(row => (
                <Paper
                    key={row}
                    elevation={0}
                    sx={{
                        display: "flex",
                        mb: 0.5,
                        px: 2,
                        py: 1.5,
                        bgcolor: row % 2 === 0 ? "background.paper" : "action.hover",
                    }}
                >
                    <Skeleton variant="text" width="70px" height={24} sx={{ mr: 2 }} />
                    <Skeleton variant="text" width="200px" height={24} sx={{ mr: 2 }} />
                    <Skeleton variant="text" width="250px" height={24} sx={{ mr: 2 }} />
                    <Skeleton variant="text" width="200px" height={24} sx={{ mr: 2 }} />
                    <Skeleton variant="text" width="130px" height={24} sx={{ mr: 2 }} />
                    <Box sx={{ display: "flex", width: "100px" }}>
                        <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                        <Skeleton variant="circular" width={24} height={24} />
                    </Box>
                </Paper>
            ))}

            {/* Pagination skeleton */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, px: 2 }}>
                <Skeleton variant="rectangular" width={250} height={36} />
            </Box>
        </Box>
    );
}
