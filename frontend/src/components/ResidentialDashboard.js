import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Box,
    Alert,
    CircularProgress,
    Tooltip,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TableSortLabel
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Refresh as RefreshIcon, Search as SearchIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const ResidentialDashboard = () => {
    const [residentials, setResidentials] = useState([]);
    const [filteredResidentials, setFilteredResidentials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedResidential, setSelectedResidential] = useState(null);
    const { user } = useAuth();

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [sortField, setSortField] = useState('price');
    const [sortDirection, setSortDirection] = useState('asc');

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        state: '',
        zipCode: '',
        latitude: '',
        longitude: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        squareFeet: '',
        yearBuilt: '',
        propertyType: '',
        description: ''
    });

    const fetchResidentials = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/residentials');
            if (!response.ok) {
                throw new Error('Failed to fetch residential data');
            }
            const data = await response.json();
            setResidentials(data);
            setFilteredResidentials(data);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResidentials();
    }, []);

    // Filter and sort residentials
    useEffect(() => {
        let result = [...residentials];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(residential =>
                residential.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                residential.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                residential.state.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply price range filter
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            result = result.filter(residential =>
                residential.price >= min && residential.price <= max
            );
        }

        // Apply bedrooms filter
        if (bedrooms) {
            result = result.filter(residential =>
                residential.bedrooms === parseInt(bedrooms)
            );
        }

        // Apply bathrooms filter
        if (bathrooms) {
            result = result.filter(residential =>
                residential.bathrooms === parseInt(bathrooms)
            );
        }

        // Apply property type filter
        if (propertyType) {
            result = result.filter(residential =>
                residential.propertyType === propertyType
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            const direction = sortDirection === 'asc' ? 1 : -1;

            if (typeof aValue === 'string') {
                return direction * aValue.localeCompare(bValue);
            }
            return direction * (aValue - bValue);
        });

        setFilteredResidentials(result);
    }, [residentials, searchTerm, priceRange, bedrooms, bathrooms, propertyType, sortField, sortDirection]);

    const handleSort = (field) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const handleOpenDialog = (residential = null) => {
        if (residential) {
            setSelectedResidential(residential);
            setFormData(residential);
        } else {
            setSelectedResidential(null);
            setFormData({
                address: '',
                city: '',
                state: '',
                zipCode: '',
                latitude: '',
                longitude: '',
                price: '',
                bedrooms: '',
                bathrooms: '',
                squareFeet: '',
                yearBuilt: '',
                propertyType: '',
                description: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedResidential(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = selectedResidential
                ? `http://localhost:5000/api/residentials/${selectedResidential._id}`
                : 'http://localhost:5000/api/residentials';

            const method = selectedResidential ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to save residential data');
            }

            await fetchResidentials();
            handleCloseDialog();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this residential property?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/residentials/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete residential property');
                }

                await fetchResidentials();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Residential Properties
                </Typography>
                <Box>
                    <Tooltip title="Refresh">
                        <IconButton onClick={fetchResidentials} sx={{ mr: 1 }}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                    {user?.role === 'admin' && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                        >
                            Add Property
                        </Button>
                    )}
                </Box>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Search and Filter Section */}
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Price Range</InputLabel>
                            <Select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                label="Price Range"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="0-200000">Under $200,000</MenuItem>
                                <MenuItem value="200000-400000">$200,000 - $400,000</MenuItem>
                                <MenuItem value="400000-600000">$400,000 - $600,000</MenuItem>
                                <MenuItem value="600000-1000000">$600,000 - $1,000,000</MenuItem>
                                <MenuItem value="1000000-999999999">Over $1,000,000</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Bedrooms</InputLabel>
                            <Select
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                                label="Bedrooms"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5+</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Bathrooms</InputLabel>
                            <Select
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                                label="Bathrooms"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4+</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Property Type</InputLabel>
                            <Select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                label="Property Type"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Single Family">Single Family</MenuItem>
                                <MenuItem value="Condo">Condo</MenuItem>
                                <MenuItem value="Townhouse">Townhouse</MenuItem>
                                <MenuItem value="Multi Family">Multi Family</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortField === 'address'}
                                    direction={sortField === 'address' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('address')}
                                >
                                    Address
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortField === 'city'}
                                    direction={sortField === 'city' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('city')}
                                >
                                    City
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortField === 'state'}
                                    direction={sortField === 'state' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('state')}
                                >
                                    State
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortField === 'price'}
                                    direction={sortField === 'price' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('price')}
                                >
                                    Price
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortField === 'bedrooms'}
                                    direction={sortField === 'bedrooms' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('bedrooms')}
                                >
                                    Bedrooms
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortField === 'bathrooms'}
                                    direction={sortField === 'bathrooms' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('bathrooms')}
                                >
                                    Bathrooms
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortField === 'squareFeet'}
                                    direction={sortField === 'squareFeet' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('squareFeet')}
                                >
                                    Square Feet
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredResidentials.map((residential) => (
                            <TableRow key={residential._id}>
                                <TableCell>{residential.address}</TableCell>
                                <TableCell>{residential.city}</TableCell>
                                <TableCell>{residential.state}</TableCell>
                                <TableCell>${residential.price.toLocaleString()}</TableCell>
                                <TableCell>{residential.bedrooms}</TableCell>
                                <TableCell>{residential.bathrooms}</TableCell>
                                <TableCell>{residential.squareFeet.toLocaleString()}</TableCell>
                                <TableCell>
                                    {user?.role === 'admin' && (
                                        <>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpenDialog(residential)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(residential._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedResidential ? 'Edit Property' : 'Add New Property'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="ZIP Code"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Bedrooms"
                                    name="bedrooms"
                                    type="number"
                                    value={formData.bedrooms}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Bathrooms"
                                    name="bathrooms"
                                    type="number"
                                    value={formData.bathrooms}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Square Feet"
                                    name="squareFeet"
                                    type="number"
                                    value={formData.squareFeet}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Year Built"
                                    name="yearBuilt"
                                    type="number"
                                    value={formData.yearBuilt}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Property Type"
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {selectedResidential ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ResidentialDashboard; 