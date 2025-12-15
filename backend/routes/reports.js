const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');
const auth = require('../models/User'); // Implies we need middleware to verify user, but auth route provides token. 
// We need auth middleware. Let's create it or duplicate basic check.
// Checking projects.js for pattern.

// Configure storage
// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Resolve path relative to this file (backend/routes/reports.js) -> backend/uploads
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf|xlsx|xls/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images, PDFs, and Excel files are allowed!'));
        }
    }
});

// Upload Report
router.post('/upload', upload.single('file'), async (req, res) => {
    console.log('Upload request received');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, description, uploadedBy, department } = req.body;

        const newReport = new Report({
            title,
            description,
            filePath: req.file.path,
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            uploadedBy,
            department
        });

        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        console.error('Error uploading report:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get All Reports (For Admin/Supervisor)
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find().populate('uploadedBy', 'name email role').sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get My Reports
router.get('/user/:userId', async (req, res) => {
    try {
        const reports = await Report.find({ uploadedBy: req.params.userId }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
