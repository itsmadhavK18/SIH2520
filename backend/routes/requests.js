const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Create Request
router.post('/', async (req, res) => {
    try {
        const { title, description, createdBy, department } = req.body;
        const newRequest = new Request({
            title,
            description,
            createdBy,
            department
        });
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Requests (For Admin/Supervisor)
router.get('/', async (req, res) => {
    try {
        const requests = await Request.find().populate('createdBy', 'name email role position').sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get My Requests
router.get('/user/:userId', async (req, res) => {
    try {
        const requests = await Request.find({ createdBy: req.params.userId }).sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Request Status (Approve/Reject)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status, reason } = req.body;
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { status, reason },
            { new: true }
        ).populate('createdBy', 'name email');

        if (!request) return res.status(404).json({ message: 'Request not found' });

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
