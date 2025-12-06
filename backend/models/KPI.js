const { readDB, writeDB } = require('../db');
const generateId = () => Math.random().toString(36).substr(2, 9);

const KPI = {
    find: (query = {}) => {
        const db = readDB();
        let results = db.kpis;
        if (query.applicableRoles) {
            results = results.filter(k => k.applicableRoles.includes(query.applicableRoles));
        }
        return results.map(k => ({ ...k, id: k._id }));
    },
    create: (data) => {
        const db = readDB();
        const newKPI = { _id: generateId(), ...data, createdAt: new Date(), updatedAt: new Date() };
        db.kpis.push(newKPI);
        writeDB(db);
        return newKPI;
    }
};

class KPIModel {
    constructor(data) {
        this.data = data;
    }
    async save() { return KPI.create(this.data); }
    static find(query) { return KPI.find(query); }
}

module.exports = KPIModel;
