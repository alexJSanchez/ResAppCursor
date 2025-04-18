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
import { useAuth } from '../context/AuthContext';

// Custom styled component using emotion
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const isAdmin = user?.role === 'admin';

    const handleLogout = () => {
        logout();
        navigate('/');
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
                        {isAuthenticated && (
                            <Button color="inherit" component={RouterLink} to="/map">
                                Map
                            </Button>
                        )}
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