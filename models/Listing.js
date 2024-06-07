// models/Listing.js
const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    availableDates: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Listing', listingSchema);
