const { readDB, writeDB } = require('../db');
const generateId = () => Math.random().toString(36).substr(2, 9);

const Expense = {
    find: (query = {}) => {
        const db = readDB();
        let results = db.expenses;
        if (query.projectId) {
            results = results.filter(e => e.projectId === query.projectId);
        }

        return {
            populate: (field) => {
                if (field === 'approvedBy') {
                    return results.map(e => {
                        const approver = db.users.find(u => u._id === e.approvedBy);
                        return { ...e, id: e._id, approvedBy: approver ? { ...approver, id: approver._id } : e.approvedBy };
                    });
                }
                return results.map(e => ({ ...e, id: e._id }));
            }
        };
    },
    create: (data) => {
        const db = readDB();
        const newExpense = { _id: generateId(), ...data, createdAt: new Date(), updatedAt: new Date() };
        db.expenses.push(newExpense);
        writeDB(db);
        return newExpense;
    }
};

class ExpenseModel {
    constructor(data) {
        this.data = data;
    }
    async save() { return Expense.create(this.data); }
    static find(query) { return Expense.find(query); }
}

module.exports = ExpenseModel;
