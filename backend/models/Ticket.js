const { readDB, writeDB } = require('../db');
const generateId = () => Math.random().toString(36).substr(2, 9);

const Ticket = {
    find: () => {
        const db = readDB();
        const tickets = db.tickets;
        return {
            populate: (field) => {
                if (field === 'assignedTo') {
                    return tickets.map(t => {
                        const assignee = db.users.find(u => u._id === t.assignedTo);
                        return { ...t, id: t._id, assignedTo: assignee ? { ...assignee, id: assignee._id } : t.assignedTo };
                    });
                }
                return tickets.map(t => ({ ...t, id: t._id }));
            }
        };
    },
    findByIdAndUpdate: (id, update, options) => {
        const db = readDB();
        const index = db.tickets.findIndex(t => t._id === id);
        if (index === -1) return null;

        const updatedTicket = { ...db.tickets[index], ...update, updatedAt: new Date() };
        db.tickets[index] = updatedTicket;
        writeDB(db);
        return updatedTicket;
    },
    create: (data) => {
        const db = readDB();
        const newTicket = { _id: generateId(), ...data, createdAt: new Date(), updatedAt: new Date() };
        db.tickets.push(newTicket);
        writeDB(db);
        return newTicket;
    }
};

class TicketModel {
    constructor(data) {
        this.data = data;
    }
    async save() { return Ticket.create(this.data); }
    static find() { return Ticket.find(); }
    static findByIdAndUpdate(id, update, options) { return Ticket.findByIdAndUpdate(id, update, options); }
}

module.exports = TicketModel;
