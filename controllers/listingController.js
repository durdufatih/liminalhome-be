// controllers/listingController.js
const Listing = require('../models/Listing');

const createListing = async (req, res) => {
    const { title, description, city, availableDates } = req.body;

    try {
        const newListing = await Listing.create({
            title,
            description,
            city,
            availableDates,
            user: req.user._id // Assuming you have authentication middleware to get the user ID
        });

        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json({ message: 'Listing creation failed', error: error.message });
    }
};

const getFilteredListings = async (req, res) => {
    const { city, startDate, endDate } = req.query;

    const query = {
        city: city,
        "availableDates.startDate": { $lte: new Date(endDate) },
        "availableDates.endDate": { $gte: new Date(startDate) }
    };

    try {
        const listings = await Listing.find(query).populate('user', 'name email');
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve listings', error: error.message });
    }
};

module.exports = { createListing, getFilteredListings };
