const mongoose = require('mongoose');

const PerformanceScoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    kpiId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KPI',
        required: true
    },
    value: Number,
    date: Date,
    notes: String
}, {
    timestamps: true
});

module.exports = mongoose.model('PerformanceScore', PerformanceScoreSchema);
