// routes/listingRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getFilteredListings, createListing, getUserListings, updateListing, deleteListing } = require('../controllers/listingController');
const router = express.Router();

router.get('/homes', authMiddleware.protect,getUserListings);
router.get('/', getFilteredListings);
router.post('/', authMiddleware.protect,createListing);
router.put('/:id', authMiddleware.protect, updateListing);
router.delete('/:id', authMiddleware.protect, deleteListing);

module.exports = router;
