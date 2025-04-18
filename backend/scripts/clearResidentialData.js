const mongoose = require('mongoose');
const Residential = require('../models/Residential');
require('dotenv').config();

async function clearData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resapp');
        console.log('Connected to MongoDB');

        // Clear all residential data
        await Residential.deleteMany({});
        console.log('Successfully cleared all residential data');

        // Verify the data is cleared
        const count = await Residential.countDocuments();
        console.log(`Remaining residential records: ${count}`);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

clearData(); 