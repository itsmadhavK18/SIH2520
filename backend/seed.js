const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'database.json');

const seed = async () => {
    const hashedPassword = await bcrypt.hash('password', 10);

    const data = {
        users: [
            {
                _id: '1',
                name: 'Admin User',
                email: 'admin@brahmaputraboard.gov.in',
                password: hashedPassword,
                role: 'admin',
                department: 'Administration',
                position: 'System Administrator',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: '2',
                name: 'Supervisor User',
                email: 'supervisor@brahmaputraboard.gov.in',
                password: hashedPassword,
                role: 'supervisor',
                department: 'Engineering',
                position: 'Chief Engineer',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: '3',
                name: 'Employee User',
                email: 'employee@brahmaputraboard.gov.in',
                password: hashedPassword,
                role: 'employee',
                department: 'Engineering',
                position: 'Junior Engineer',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        kpis: [
            {
                _id: '1',
                name: 'File Disposal Rate',
                description: 'Number of files processed per day',
                category: 'headquarters',
                weight: 20,
                targetValue: 10,
                unit: 'files/day',
                applicableRoles: ['employee', 'supervisor'],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: '2',
                name: 'Turnaround Time',
                description: 'Average time taken to process a file',
                category: 'headquarters',
                weight: 15,
                targetValue: 2,
                unit: 'days',
                applicableRoles: ['employee', 'supervisor'],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        performanceScores: [
            {
                _id: '1',
                userId: '3',
                kpiId: '1',
                value: 8,
                date: new Date('2023-10-01'),
                notes: 'Good performance but can improve',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        projects: [
            {
                _id: '1',
                name: 'Brahmaputra River Basin Study',
                description: 'Comprehensive study of the Brahmaputra river basin',
                startDate: new Date('2023-01-01'),
                endDate: new Date('2023-12-31'),
                budget: 5000000,
                status: 'in-progress',
                manager: '2',
                team: ['3'],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        expenses: [
            {
                _id: '1',
                projectId: '1',
                amount: 50000,
                category: 'Equipment',
                date: new Date('2023-02-15'),
                description: 'Purchase of survey equipment',
                approvedBy: '2',
                status: 'approved',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        tickets: [
            {
                _id: '1',
                title: 'Request for project information',
                description: 'RTI request for information about the Brahmaputra River Basin Study',
                createdBy: 'public@example.com',
                assignedTo: '1',
                status: 'open',
                priority: 'medium',
                category: 'rti',
                createdAt: new Date('2023-10-01'),
                updatedAt: new Date('2023-10-01')
            }
        ]
    };

    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    console.log('Database seeded successfully');
};

seed();
