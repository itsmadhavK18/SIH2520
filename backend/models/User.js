const { readDB, writeDB } = require('../db');
const { v4: uuidv4 } = require('uuid'); // We'll need to install uuid or use a simple random string

// Simple ID generator if uuid isn't available yet
const generateId = () => Math.random().toString(36).substr(2, 9);

const User = {
    find: () => {
        const db = readDB();
        return {
            select: (fields) => {
                return db.users.map(u => ({ ...u, id: u._id }));
            }
        };
    },
    findOne: ({ email }) => {
        const db = readDB();
        const user = db.users.find(u => u.email === email);
        return user ? { ...user, id: user._id } : null;
    },
    findById: (id) => {
        const db = readDB();
        const user = db.users.find(u => u._id === id);
        return {
            select: () => user ? { ...user, id: user._id } : null
        };
    },
    create: (userData) => {
        const db = readDB();
        const newUser = { _id: generateId(), ...userData, createdAt: new Date(), updatedAt: new Date() };
        db.users.push(newUser);
        writeDB(db);
        return newUser;
    }
};

// Constructor wrapper to match Mongoose syntax in routes
class UserModel {
    constructor(data) {
        this.data = data;
    }

    async save() {
        return User.create(this.data);
    }

    static find() { return User.find(); }
    static findOne(query) { return User.findOne(query); }
    static findById(id) { return User.findById(id); }
}

module.exports = UserModel;
