const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/kpis', require('./routes/kpis'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/tickets', require('./routes/tickets'));

app.get('/', (req, res) => {
  res.send('API is running (File-based DB)...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
