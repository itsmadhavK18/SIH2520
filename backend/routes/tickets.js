const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('assignedTo');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Ticket
router.post('/', async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Ticket Status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
