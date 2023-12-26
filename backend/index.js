const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cms_cards = require('./routers/cms_cards');
const cms_dashboard = require('./routers/cms_dashboard_routes');


const app = express();

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3001', // Adjust as needed
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Parse JSON requests
app.use(express.json());

// MongoDB Connection String
const mongoDBConnectionString = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', error => console.error('Varvara, error connecting to MongoDB:', error));
db.on('connected', () => console.log('Varvara, successfully connected to MongoDB'));
db.on('disconnected', () => console.log('Varvara, disconnected from MongoDB'));

// Routes
app.use('/api/cms_cards', cms_cards);
app.use('/api/dashboard', cms_dashboard);


// Server Listening
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
