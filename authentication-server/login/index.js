const functions = require('@google-cloud/functions-framework');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Environment variables
const MONGO_URI = process.env.MONGODB_URI;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

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

// Login function
functions.http('login', async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    try {
        const db = await connectToDB();
        const user = await db.collection('users').findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({ username: user.username }, ACCESS_TOKEN_SECRET);
            res.json({ userid: user._id.toString(), accessToken: accessToken });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: error.message });
    }
});
