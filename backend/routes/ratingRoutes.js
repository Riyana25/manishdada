const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Define routes

// Create a rating
router.post('/create', ratingController.createRating);

// Get ratings for a specific user
router.get('/user/:userId', ratingController.getUserRatings);

// Get average rating for a specific user
router.get('/user/average/:userId', ratingController.getUserAverageRating);

// Get ratings for a specific ride
router.get('/ride/:rideId', ratingController.getRideRatings);

// Update a rating
router.put('/update/:ratingId', ratingController.updateRating);

// Delete a rating
router.delete('/delete/:ratingId', ratingController.deleteRating);

module.exports = router;
