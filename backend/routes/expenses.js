const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get expenses by project
router.get('/project/:projectId', async (req, res) => {
    try {
        const expenses = await Expense.find({ projectId: req.params.projectId }).populate('approvedBy');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Expense
router.post('/', async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
