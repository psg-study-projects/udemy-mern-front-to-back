// Mongo DB connection

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// use async await > promises
const connectDB = async () => {
    try {
        console.log('trying...'+db);
        // returns a promise
        await mongoose.connect(db, {
            useNewUrlParser: true
        }); 
        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        process.exit(1); // escape the process w/ failure
    }
}

module.exports = connectDB;
