const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const { MONGO_URI } = require('../utils/utils');
// const uri = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

// Route for getting all cards
router.get('/', async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('test');
        const cards = await db.collection('cards').find().toArray();
        await client.close();

        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ message: 'Error fetching cards' });
    }
});

// Route to update a card name

router.put('/:id', async (req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('test');

        const updatedCard = await db.collection('cards')
            .findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                { $set: { name: req.body.name } },
                { returnOriginal: 'after' }
            );

        await client.close();

        if (!updatedCard.value) return res.status(404).json({ message: 'Card not found' });
        res.status(200).json(updatedCard.value);
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ message: 'Error updating card' });
    }
});



module.exports = router;