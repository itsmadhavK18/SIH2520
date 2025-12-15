const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sih2520');
        console.log('MongoDB Connected');

        // Clear existing data
        await User.deleteMany({});
        console.log('Users collection cleared');

        const hashedPassword = await bcrypt.hash('password', 10);

        const users = [
            {
                name: 'Admin User',
                email: 'admin@brahmaputraboard.gov.in',
                password: hashedPassword,
                role: 'admin',
                department: 'Administration',
                position: 'System Administrator'
            },
            {
                name: 'Supervisor User',
                email: 'supervisor@brahmaputraboard.gov.in',
                password: hashedPassword,
                role: 'supervisor',
                department: 'Engineering',
                position: 'Chief Engineer'
            },
            {
                name: 'Employee User',
                email: 'employee@brahmaputraboard.gov.in',
                password: hashedPassword,
                role: 'employee',
                department: 'Engineering',
                position: 'Junior Engineer'
            }
        ];

        const createdUsers = await User.insertMany(users);
        console.log('Users seeded');

        // Create other models
        const Project = require('./models/Project');
        const Ticket = require('./models/Ticket');
        const KPI = require('./models/KPI');
        const Expense = require('./models/Expense');
        const PerformanceScore = require('./models/PerformanceScore');

        await Project.deleteMany({});
        await Ticket.deleteMany({});
        await KPI.deleteMany({});
        await Expense.deleteMany({});
        await PerformanceScore.deleteMany({});

        const supervisor = createdUsers.find(u => u.role === 'supervisor');
        const employee = createdUsers.find(u => u.role === 'employee');

        // Projects
        const projects = await Project.insertMany([
            {
                name: 'Brahmaputra River Basin Study',
                description: 'Comprehensive study of the Brahmaputra river basin',
                startDate: new Date('2023-01-01'),
                endDate: new Date('2023-12-31'),
                budget: 5000000,
                status: 'in-progress',
                manager: supervisor._id,
                team: [employee._id]
            }
        ]);
        console.log('Projects seeded');

        // KPIs
        const kpis = await KPI.insertMany([
            {
                name: 'File Disposal Rate',
                description: 'Number of files processed per day',
                category: 'headquarters',
                weight: 20,
                targetValue: 10,
                unit: 'files/day',
                applicableRoles: ['employee', 'supervisor']
            },
            {
                name: 'Turnaround Time',
                description: 'Average time taken to process a file',
                category: 'headquarters',
                weight: 15,
                targetValue: 2,
                unit: 'days',
                applicableRoles: ['employee', 'supervisor']
            }
        ]);
        console.log('KPIs seeded');

        // Tickets
        await Ticket.insertMany([
            {
                title: 'Request for project information',
                description: 'RTI request for information about the Brahmaputra River Basin Study',
                createdBy: 'public@example.com',
                assignedTo: supervisor._id,
                status: 'open',
                priority: 'medium',
                category: 'rti'
            }
        ]);
        console.log('Tickets seeded');

        // Expenses
        await Expense.insertMany([
            {
                projectId: projects[0]._id,
                amount: 50000,
                category: 'Equipment',
                date: new Date('2023-02-15'),
                description: 'Purchase of survey equipment',
                approvedBy: supervisor._id,
                status: 'approved'
            }
        ]);
        console.log('Expenses seeded');

        // Performance Scores
        await PerformanceScore.insertMany([
            {
                userId: employee._id,
                kpiId: kpis[0]._id,
                value: 8,
                date: new Date('2023-10-01'),
                notes: 'Good performance but can improve'
            }
        ]);
        console.log('Performance Scores seeded');

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
