const express = require('express');
const router = express.Router();
const KPI = require('../models/KPI');
const PerformanceScore = require('../models/PerformanceScore');

// Get all KPIs
router.get('/', async (req, res) => {
    try {
        const kpis = await KPI.find();
        res.json(kpis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get KPIs by role
router.get('/role/:role', async (req, res) => {
    try {
        const kpis = await KPI.find({ applicableRoles: req.params.role });
        res.json(kpis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create KPI
router.post('/', async (req, res) => {
    try {
        const kpi = new KPI(req.body);
        await kpi.save();
        res.status(201).json(kpi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Performance Scores for a user
router.get('/scores/:userId', async (req, res) => {
    try {
        const scores = await PerformanceScore.find({ userId: req.params.userId }).populate('kpiId');
        res.json(scores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Performance Score
router.post('/scores', async (req, res) => {
    try {
        const score = new PerformanceScore(req.body);
        await score.save();
        res.status(201).json(score);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
