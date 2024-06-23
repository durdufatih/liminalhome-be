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

const getUserListings = async (req, res) => {
    try {
        const userListings = await Listing.find({ user: req.user._id });
        res.json(userListings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user listings', error: error.message });
    }
};

const updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, city, availableDates } = req.body;

    try {
        const updatedListing = await Listing.findByIdAndUpdate(id, {
            title,
            description,
            city,
            availableDates
        }, { new: true }); // { new: true } option returns the updated document

        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.json(updatedListing);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update listing', error: error.message });
    }
};

const deleteListing = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedListing = await Listing.findByIdAndDelete(id);

        if (!deletedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.status(204).json(); // Returns 204 No Content on successful deletion
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete listing', error: error.message });
    }
};

module.exports = { createListing, getFilteredListings, getUserListings, updateListing, deleteListing };

