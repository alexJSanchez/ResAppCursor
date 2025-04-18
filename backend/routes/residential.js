const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Residential = require('../models/Residential');
const User = require('../models/User');

// Middleware to verify admin role
const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        const user = await User.findById(decoded.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get all residentials
router.get('/', async (req, res) => {
    try {
        const residentials = await Residential.find();
        res.json(residentials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single residential by ID
router.get('/:id', async (req, res) => {
    try {
        const residential = await Residential.findOne({ id: req.params.id });
        if (!residential) {
            return res.status(404).json({ message: 'Residential not found' });
        }
        res.json(residential);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new residential (admin only)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const residential = new Residential(req.body);
        await residential.save();
        res.status(201).json(residential);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update residential (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const residential = await Residential.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!residential) {
            return res.status(404).json({ message: 'Residential not found' });
        }
        res.json(residential);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete residential (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const residential = await Residential.findOneAndDelete({ id: req.params.id });
        if (!residential) {
            return res.status(404).json({ message: 'Residential not found' });
        }
        res.json({ message: 'Residential deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 