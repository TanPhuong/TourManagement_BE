const express = require('express');
const router = express.Router();
const tourController = require('../controller/TourController');

router.get('/list-tour', tourController.listTour);
router.post('/create-tour', tourController.createTour);
router.put('/update-tour/:id', tourController.updateTour);
router.get('/detail-tour/:id', tourController.detailTour);
router.delete('/delete-tour/:id', tourController.deleteTour);
router.get('/detail-tour', tourController.detailTourBooking);
router.get('/revenue-tour', tourController.revenueTour)
router.get('/search-tour', tourController.searchTour)

module.exports = router;