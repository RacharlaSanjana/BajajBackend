const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    data: [String],
    numbers: [String],
    alphabets: [String],
    highest_alphabet: [String],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Entry', entrySchema);
