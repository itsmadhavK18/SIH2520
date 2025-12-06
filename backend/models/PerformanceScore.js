const { readDB, writeDB } = require('../db');
const generateId = () => Math.random().toString(36).substr(2, 9);

const PerformanceScore = {
    find: (query = {}) => {
        const db = readDB();
        let results = db.performanceScores;
        if (query.userId) {
            results = results.filter(s => s.userId === query.userId);
        }

        // Mock populate
        return {
            populate: (field) => {
                if (field === 'kpiId') {
                    return results.map(score => {
                        const kpi = db.kpis.find(k => k._id === score.kpiId);
                        return { ...score, id: score._id, kpiId: kpi ? { ...kpi, id: kpi._id } : score.kpiId };
                    });
                }
                return results.map(s => ({ ...s, id: s._id }));
            }
        };
    },
    create: (data) => {
        const db = readDB();
        const newScore = { _id: generateId(), ...data, createdAt: new Date(), updatedAt: new Date() };
        db.performanceScores.push(newScore);
        writeDB(db);
        return newScore;
    }
};

class PerformanceScoreModel {
    constructor(data) {
        this.data = data;
    }
    async save() { return PerformanceScore.create(this.data); }
    static find(query) { return PerformanceScore.find(query); }
}

module.exports = PerformanceScoreModel;
