const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'supervisor', 'employee', 'ippms_admin'],
        default: 'employee'
    },
    permissions: {
        type: [String],
        default: []
    },
    department: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
