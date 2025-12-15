const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sih2520');
        console.log('Connected to DB');

        const specificUser = await User.findOne({ email: 'madhavkumar5737@gmail.com' });
        if (specificUser) {
            console.log('Found User:');
            console.log(`Email: ${specificUser.email}`);
            console.log(`Role: ${specificUser.role}`);
            console.log(`ID: ${specificUser._id}`);
            // We cannot check password without knowing it, but we confirm existence.
        } else {
            console.log('User madhavkumar5737@gmail.com NOT FOUND');
        }

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

test();
