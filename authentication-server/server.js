const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  { connectToDB, getDB } = require('./db.js');
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors())

let db;

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create a new user with the additional fields from the form
        const user = { 
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            age: req.body.age,
            incomeSource: req.body.incomeSource // make sure to match this field name with your form input name
        };

        await db.collection('users').insertOne(user);

        res.status(201).send('User registered');
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
});

// New endpoint to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await db.collection('users').find({}).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
    console.log("req.body.username :: "+ req.body.username )
    try {
        const user = await db.collection('users').findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
            res.json({userid:user._id.toString(), accessToken: accessToken });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


connectToDB(process.env.MONGO_Ahmed_URL).then(() => {
    db = getDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
