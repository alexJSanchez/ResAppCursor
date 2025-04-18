const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://alexjsanchez1020:BnGej2Z5avKyQ6Dp@cluster0.lyxywhx.mongodb.net/resapp?retryWrites=true&w=majority&appName=Cluster0');

        const users = await User.find().select('-password');
        console.log('\nCurrent Users in Database:');
        console.log('------------------------');
        users.forEach((user, index) => {
            console.log(`\nUser ${index + 1}:`);
            console.log(`Username: ${user.username}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role}`);
            console.log(`Created At: ${new Date(user.createdAt).toLocaleString()}`);
            console.log('------------------------');
        });

        if (users.length === 0) {
            console.log('No users found in the database.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error listing users:', error);
        process.exit(1);
    }
};

listUsers(); 