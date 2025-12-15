const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DB_PATH = path.join(__dirname, 'database.json');

// Connect to MongoDB
const connectDB = async (retries = 5) => {
    while (retries) {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sih2520');
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return;
        } catch (error) {
            console.error(`Error: ${error.message}`);
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            if (retries === 0) process.exit(1);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
};

// Initialize file-based DB if it doesn't exist (Legacy)
if (!fs.existsSync(DB_PATH)) {
    const initialData = {
        users: [],
        kpis: [],
        performanceScores: [],
        projects: [],
        expenses: [],
        tickets: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
}

const readDB = () => {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
};

const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

module.exports = {
    connectDB,
    readDB,
    writeDB
};
