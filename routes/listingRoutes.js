// routes/listingRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getFilteredListings, createListing } = require('../controllers/listingController');
const router = express.Router();

router.get('/', getFilteredListings);
router.post('/', authMiddleware.protect,createListing);

module.exports = router;
