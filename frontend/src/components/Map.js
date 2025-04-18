import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You clicked here</Popup>
        </Marker>
    );
};

const RestaurantMap = () => {
    const [position, setPosition] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    const handleSearch = async () => {
        // This is a placeholder for actual search functionality
        // In a real implementation, you would call your backend API
        console.log('Searching for:', searchQuery);
    };

    return (
        <Box sx={{ height: '100vh', width: '100%', p: 2 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Search for restaurants"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                </Box>
            </Paper>

            <MapContainer
                center={[40.7128, -74.0060]}
                zoom={13}
                style={{ height: '80vh', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
        </Box>
    );
};

export default RestaurantMap; 