const mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    
    date: {
        type: String,
        required: 'This field is required.'        
    },

    content: {
        type: String,
        required: 'This field is required.'
    }
});

mongoose.model('entry', entrySchema);