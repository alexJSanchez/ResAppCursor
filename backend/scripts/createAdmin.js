const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://alexjsanchez1020:BnGej2Z5avKyQ6Dp@cluster0.lyxywhx.mongodb.net/resapp?retryWrites=true&w=majority&appName=Cluster0');

        const adminUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: 'Admin123!', // This will be hashed by the pre-save middleware
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin(); 