const { readDB, writeDB } = require('../db');
const generateId = () => Math.random().toString(36).substr(2, 9);

const Project = {
    find: () => {
        const db = readDB();
        const projects = db.projects;
        return {
            populate: (fields) => {
                // Mock populate for manager and team
                return projects.map(p => {
                    const manager = db.users.find(u => u._id === p.manager);
                    const team = p.team ? p.team.map(tid => db.users.find(u => u._id === tid)).filter(Boolean) : [];
                    return {
                        ...p,
                        id: p._id,
                        manager: manager ? { ...manager, id: manager._id } : p.manager,
                        team: team.map(t => ({ ...t, id: t._id }))
                    };
                });
            }
        };
    },
    findById: (id) => {
        const db = readDB();
        const project = db.projects.find(p => p._id === id);
        if (!project) return null;

        return {
            populate: (fields) => {
                const manager = db.users.find(u => u._id === project.manager);
                const team = project.team ? project.team.map(tid => db.users.find(u => u._id === tid)).filter(Boolean) : [];
                return { ...project, manager, team };
            }
        };
    },
    create: (data) => {
        const db = readDB();
        const newProject = { _id: generateId(), ...data, createdAt: new Date(), updatedAt: new Date() };
        db.projects.push(newProject);
        writeDB(db);
        return newProject;
    }
};

class ProjectModel {
    constructor(data) {
        this.data = data;
    }
    async save() { return Project.create(this.data); }
    static find() { return Project.find(); }
    static findById(id) { return Project.findById(id); }
}

module.exports = ProjectModel;
