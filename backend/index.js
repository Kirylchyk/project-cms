const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cms_cards = require('./routers/cms_cards');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests


// My MongoDB connection string
const mongoDBConnectionString = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Successfully connected to MongoDB');
});

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// All routes
app.use('/api/cms_cards', cms_cards);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});