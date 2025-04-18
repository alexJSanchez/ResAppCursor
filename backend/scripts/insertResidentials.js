const mongoose = require('mongoose');
const Residential = require('../models/Residential');

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/resapp';

// Sample residential data
const residentials = [
    {
        address: "123 Main St",
        director: "John Smith",
        portfolio_manager: "Jane Doe",
        super: {
            name: "Mike Johnson",
            phone: "555-123-4567",
            email: "mike@example.com"
        },
        backup_super: {
            name: "Sarah Williams",
            phone: "555-987-6543",
            email: "sarah@example.com"
        },
        total_units: 50,
        occupied_units: 45,
        vacant_units: 5,
        maintenance_requests: 3,
        violations: 1,
        complaints: 2
    },
    {
        address: "456 Oak Ave",
        director: "Robert Brown",
        portfolio_manager: "Emily Davis",
        super: {
            name: "David Lee",
            phone: "555-234-5678",
            email: "david@example.com"
        },
        backup_super: {
            name: "Lisa Chen",
            phone: "555-876-5432",
            email: "lisa@example.com"
        },
        total_units: 75,
        occupied_units: 70,
        vacant_units: 5,
        maintenance_requests: 5,
        violations: 2,
        complaints: 3
    },
    {
        address: "789 Pine St",
        director: "Michael Wilson",
        portfolio_manager: "Jessica Taylor",
        super: {
            name: "James Anderson",
            phone: "555-345-6789",
            email: "james@example.com"
        },
        backup_super: {
            name: "Patricia Martinez",
            phone: "555-765-4321",
            email: "patricia@example.com"
        },
        total_units: 100,
        occupied_units: 95,
        vacant_units: 5,
        maintenance_requests: 7,
        violations: 3,
        complaints: 4
    }
];

async function insertResidentials() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing data
        await Residential.deleteMany({});
        console.log('Cleared existing residential data');

        // Insert new data
        const result = await Residential.insertMany(residentials);
        console.log(`Successfully inserted ${result.length} residential properties`);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

insertResidentials(); 