const mongoose = require('mongoose');

//entry Schema set up

const entrySchema = new mongoose.Schema({
    description: String,
    id: Number
});

module.exports = mongoose.model('Entry', entrySchema);