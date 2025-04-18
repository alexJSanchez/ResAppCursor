const mongoose = require('mongoose');
const Residential = require('../models/Residential');
require('dotenv').config();

const residentialData = [
    {
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        latitude: 40.7128,
        longitude: -74.0060,
        price: 750000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 2000,
        yearBuilt: 1990,
        propertyType: "Single Family",
        description: "Beautiful home in the heart of the city"
    },
    {
        address: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        latitude: 34.0522,
        longitude: -118.2437,
        price: 850000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        yearBuilt: 1985,
        propertyType: "Single Family",
        description: "Spacious home with mountain views"
    },
    {
        address: "789 Pine St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        latitude: 41.8781,
        longitude: -87.6298,
        price: 600000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1500,
        yearBuilt: 2000,
        propertyType: "Condo",
        description: "Modern condo in downtown"
    }
];

async function insertData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resapp');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Residential.deleteMany({});
        console.log('Cleared existing residential data');

        // Insert new data
        await Residential.insertMany(residentialData);
        console.log('Successfully inserted residential data');

        // Display inserted data
        const insertedData = await Residential.find();
        console.log('\nInserted Data:');
        insertedData.forEach(property => {
            console.log(`\nAddress: ${property.address}`);
            console.log(`City: ${property.city}`);
            console.log(`Price: $${property.price}`);
            console.log(`Bedrooms: ${property.bedrooms}`);
            console.log(`Bathrooms: ${property.bathrooms}`);
            console.log('------------------------');
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

insertData(); 