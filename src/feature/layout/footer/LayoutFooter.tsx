'use client';

// MUI dependencies
import { Box, Container, Typography } from '@mui/material';

export default function LayoutFooter() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: theme => theme.palette.grey[100],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} Employee Management Dashboard
                </Typography>
            </Container>
        </Box>
    );
}
