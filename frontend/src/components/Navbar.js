import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    // This would come from your auth context/state management
    const isAuthenticated = false;
    const isAdmin = false;

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

                    <Box>
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
                                    onClick={() => {
                                        // Add logout logic here
                                        console.log('Logout clicked');
                                    }}
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