const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.json');

// Initialize DB if it doesn't exist
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
    readDB,
    writeDB
};
