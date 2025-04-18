import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    Alert,
    CircularProgress,
} from '@mui/material';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)`
  padding: 24px;
  margin: 24px 0;
`;

// Mock data - in a real app, this would come from an API
const mockUsers = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user', createdAt: '2023-01-01' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'admin', createdAt: '2023-01-02' },
    { id: 3, username: 'bob_wilson', email: 'bob@example.com', role: 'user', createdAt: '2023-01-03' },
];

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Simulate API call
        const fetchUsers = async () => {
            try {
                setLoading(true);
                // TODO: Replace with actual API call
                // const response = await fetch('/api/admin/users');
                // const data = await response.json();
                setUsers(mockUsers);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            // TODO: Replace with actual API call
            // await fetch(`/api/admin/users/${userId}/role`, {
            //   method: 'PUT',
            //   body: JSON.stringify({ role: newRole }),
            // });
            setUsers(users.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            ));
        } catch (err) {
            setError('Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            // TODO: Replace with actual API call
            // await fetch(`/api/admin/users/${userId}`, {
            //   method: 'DELETE',
            // });
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Dashboard
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <StyledPaper elevation={3}>
                <Typography variant="h6" gutterBottom>
                    User Management
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.role}
                                            color={user.role === 'admin' ? 'primary' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                                        >
                                            Toggle Role
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </StyledPaper>

            <StyledPaper elevation={3}>
                <Typography variant="h6" gutterBottom>
                    Admin Actions
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="primary">
                        Export Users
                    </Button>
                    <Button variant="contained" color="secondary">
                        Generate Reports
                    </Button>
                </Box>
            </StyledPaper>
        </Box>
    );
};

export default AdminDashboard; 