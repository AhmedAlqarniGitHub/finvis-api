const { MongoClient, ServerApiVersion } = require('mongodb');

let db;

async function connectToDB(uri) {
    const client = new MongoClient(uri, {serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }});
    await client.db("finvis").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
      db = client.db('finvis');
    console.log('Connected to MongoDB');
}

function getDB() {
    return db;
}

module.exports = { connectToDB, getDB };
