const mongoose = require('mongoose');
require('dotenv').config();

// define mongoDB url
//const mongoUrl = process.env.MONGODB_URL_LOCAL

const mongoUrl = process.env.MONGODB_URL;

// connect to mongoDB
mongoose.connect(mongoUrl,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

// define event listener for db connection

db.on('connected', ()=>{
    console.log('MongoDB connected successfully');
});

db.on('error', (err)=>{
    console.log('MongoDB connection error: ', err);
});

db.on('disconnected', ()=>{
    console.log('MongoDb Disconnected');
});

// export the database connection

module.exports = db;

