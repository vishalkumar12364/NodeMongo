const mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    
    date: {
        type: Date
    },
    content: {
        type: String
    }
});

mongoose.model('entry', entrySchema);