import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import styled from '@emotion/styled';

// Custom styled component using emotion
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin';

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to home page
        navigate('/');
        // Refresh the page to update the UI
        window.location.reload();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <StyledToolbar>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer'
                        }}
                    >
                        ResApp
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {!isAuthenticated ? (
                            <>
                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/login"
                                >
                                    Login
                                </Button>
                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/register"
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <>
                                {isAdmin && (
                                    <Button
                                        color="inherit"
                                        component={RouterLink}
                                        to="/admin"
                                    >
                                        Admin Dashboard
                                    </Button>
                                )}
                                <Button
                                    color="inherit"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                </StyledToolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar; 