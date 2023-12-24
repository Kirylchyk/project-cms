const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const { MONGO_URI } = require('../utils/utils');


router.get('/cardCount', async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('test');
        const count = await db.collection('cards').countDocuments();
        await client.close();

        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching card count', error: error.message });
    }
});

router.get('/averagePrice', async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('test');
        const average = await db.collection('cards').aggregate([
            { $group: { _id: null, averagePrice: { $avg: "$price" } } }
        ]).toArray();
        await client.close();

        res.status(200).json({ averagePrice: average[0].averagePrice });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching average price', error: error.message });
    }
});
