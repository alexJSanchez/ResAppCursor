import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)`
  padding: 24px;
  text-align: center;
`;

const Home = () => {
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <StyledPaper elevation={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to ResApp
                </Typography>
                <Typography variant="body1" paragraph>
                    This is a secure application with user authentication and admin capabilities.
                    Please login or register to access the full features.
                </Typography>
            </StyledPaper>
        </Box>
    );
};

export default Home; 