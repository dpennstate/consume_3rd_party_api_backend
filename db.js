const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/mydatabase"
let db = null;

async function connectDB() {
    try {
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log('Connected to MongoDB')
        })
    } catch (err) {
        console.error("Could not connect to database", err)
    }
}

module.exports = {connectDB}