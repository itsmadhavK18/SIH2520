const mongoose = require('mongoose');

const KPISchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    category: String,
    weight: Number,
    targetValue: Number,
    unit: String,
    applicableRoles: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('KPI', KPISchema);
