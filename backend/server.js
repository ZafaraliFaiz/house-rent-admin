const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for rent entries
let rentEntries = [];

// Get all rent entries
app.get('/api/rent-entries', (req, res) => {
  res.json(rentEntries);
});

// Add a new rent entry
app.post('/api/rent-entries', (req, res) => {
  const { date, tenant, amount, notes } = req.body;

  if (!date || !tenant || !amount) {
    return res.status(400).json({ message: 'Date, Tenant, and Amount are required.' });
  }

  const newEntry = { date, tenant, amount, notes };
  rentEntries.push(newEntry);

  res.status(201).json(newEntry);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('http://localhost:3000')
});
