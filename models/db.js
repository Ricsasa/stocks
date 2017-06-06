const mongoose = require('mongoose');

const dbURI = 'mongodb://ricsasa:ricsasa@ds161471.mlab.com:61471/stock-watcher';

mongoose.connect(dbURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
