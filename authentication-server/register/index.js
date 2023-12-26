const functions = require('@google-cloud/functions-framework');
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Environment variables
const MONGO_URI = process.env.MONGODB_URI;

// MongoDB Client setup
let db;
async function connectToDB() {
    if (db) {
        return db;
    }

    const client = new MongoClient(MONGO_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        db = client.db('finvis');
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }
}

// Register function
functions.http('register', async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }


    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            age: req.body.age,
            incomeSource: req.body.incomeSource
        };

        const db = await connectToDB();
        await db.collection('users').insertOne(user);

        res.status(201).send('User registered');
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send(error.message);
    }
});
