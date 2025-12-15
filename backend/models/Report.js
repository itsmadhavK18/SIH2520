const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    filePath: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    department: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', ReportSchema);
